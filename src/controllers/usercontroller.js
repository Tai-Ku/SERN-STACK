import { handleUser, getAllUserServiecs } from "../services/userServieces";

let handleLogin = async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing input paramaters",
    });
  }
  let userData = await handleUser(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    userData: userData.user ? userData.user : { errCode: 1 },
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.body.id; //All Or Id
  let users = await getAllUserServiecs(id);
  if (id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "ok",
      userData: users,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "err id undifined",
      users: [],
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUser,
};
