import bcrypt from "bcryptjs";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassWordFromBcrypt = await hashUserPassWord(data.password);

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
      resolve("Create User sucess Oke!!!!");
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

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let putUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  putUpdateUser,
  deleteUserById,
};
