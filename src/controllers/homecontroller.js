import db from "../models/index";
import { createNewUser } from "../services/CRUDServiecs";
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
module.exports = {
  getHomePage,
  getCRUD,
  postCrud,
};
