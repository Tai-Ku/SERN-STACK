import db from "../models/index";
import { createNewUser, getAllUsers } from "../services/CRUDServiecs";
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
module.exports = {
  getHomePage,
  getCRUD,
  postCrud,
  displayGetCRUD,
  getAllUsers,
};
