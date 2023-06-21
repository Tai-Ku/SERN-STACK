import express from "express";
import {
  getHomePage,
  getCRUD,
  postCrud,
  displayGetCRUD,
  getEditCRUD,
  getUpdateCRUD,
  getDeleteCRUD,
} from "../controllers/homecontroller";

import {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
} from "../controllers/usercontroller";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCrud);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.post("/put-crud", getUpdateCRUD);
  router.get("/delete-crud", getDeleteCRUD);

  // api

  router.post("/api/login", handleLogin);
  // api CRUD
  router.get("/api/get-all-user", handleGetAllUser);
  router.post("/api/create-newuser", handleCreateUser);
  router.delete("/api/delete-user", handleDeleteUser);
  router.put("/api/update-user", handleUpdateUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
