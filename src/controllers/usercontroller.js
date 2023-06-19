import { handleUser } from "../services/userServieces";

let handleLogin = async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input paramaters",
    });
  }
  let userData = await handleUser(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    userData: userData.user ? userData.user : { errCode: 1 },
  });
};
module.exports = {
  handleLogin,
};
