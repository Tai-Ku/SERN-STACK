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
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCrud);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.post("/put-crud", getUpdateCRUD);
  router.get("/delete-crud", getDeleteCRUD);

  return app.use("/", router);
};
module.exports = initWebRoutes;
