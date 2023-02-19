import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExistUser = await checkUserEmail(email);
      if (isExistUser) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "roleId"],
          raw: true,
        });
        if (user) {
          let checkPassword = await bcrypt.compare(password, user.password);
          delete user.password;
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong Password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Your's Email isn't exist in your system. Please try other email.`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Please try other email.`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: email }, raw: true });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { handleUserLogin };
