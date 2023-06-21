import db from "../models/index";
import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(10);

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
let createNewlUserServiecs = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassWordFromBcrypt = await hashUserPassWord(data.password);
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errMessage: "email aleardy exists",
        });
      } else {
        await db.User.create({
          email: data.email,
          password: hashUserPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hasPassWord = await bcrypt.hashSync(password, salt);
      resolve(hasPassWord);

      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserServiecs = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await db.User.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Can't find User",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateteUserServiecs = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "oke",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Can't not found user",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUser,
  getAllUserServiecs,
  createNewlUserServiecs,
  deleteUserServiecs,
  updateteUserServiecs,
};
