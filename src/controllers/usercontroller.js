import {
  handleUser,
  getAllUserServiecs,
  createNewlUserServiecs,
  deleteUserServiecs,
  updateteUserServiecs,
} from "../services/userServieces";

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
  let id = req.query.id; //All Or Id
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

let handleCreateUser = async (req, res) => {
  const data = req.body;
  const field = [
    "email",
    "password",
    "firstName",
    "lastName",
    "address",
    "phonenumber",
    "gender",
    "roleId",
  ];

  const checkData = field.every((i) => data[i]);
  if (checkData) {
    const user = await createNewlUserServiecs(req.body);
    res.status(200).json(user);
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parameters",
    });
  }
};

let handleDeleteUser = async (req, res) => {
  const id = req.body.id;
  if (id) {
    const user = await deleteUserServiecs(id);
    return res.status(200).json(user);
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input paramaters",
    });
  }
};

let handleUpdateUser = async (req, res) => {
  const data = req.body;

  if (data.id) {
    const user = await updateteUserServiecs(data);
    return res.status(200).json(user);
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parameters ",
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
};
