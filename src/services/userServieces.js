import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExists = await checkUserEmail(email);
      console.log("user", isExists);

      if (isExists) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
          attributes: ["email", "roleId", "password"],
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = "ok"),
              delete user.password,
              (userData.user = user);
          } else {
            (userData.errCode = 3), (userData.errMessage = "wrong pass ");
          }
        } else {
          userData.errCode = 1;
          userData.errMessage = `your email isn't exists in your system . Plz try orther email! `;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `your email isn't exists in your system . Plz try orther email! `;
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      user ? resolve(true) : resolve(false);
    } catch (error) {
      reject(e);
    }
  });
};

let getAllUserServiecs = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user;
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && (userId !== "null") & (userId !== "ALL")) {
        user = await db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUser,
  getAllUserServiecs,
};
