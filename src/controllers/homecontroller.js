import db from "../models/index";
import {
  createNewUser,
  getAllUsers,
  getUserInfoById,
  putUpdateUser,
} from "../services/CRUDServiecs";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("------");
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCrud = async (req, res) => {
  const mess = await createNewUser(req.body);
  console.log(mess);
  return res.send("hello submit ");
};
let displayGetCRUD = async (req, res) => {
  let data = await getAllUsers();
  return res.render("display-crud.ejs", { data: data });
};

let getEditCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let userData = await getUserInfoById(id);
    console.log(userData);

    return res.render("edit-crud.ejs", { userData });
  } else {
    return res.send("hello deit page");
  }
};

let getUpdateCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await putUpdateUser(data);
  return res.render("display-crud.ejs", { data: allUsers });
};
module.exports = {
  getHomePage,
  getCRUD,
  postCrud,
  displayGetCRUD,
  getAllUsers,
  getEditCRUD,
  getUpdateCRUD,
};
