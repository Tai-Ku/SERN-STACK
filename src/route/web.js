import express from "express";
import {
  getHomePage,
  getCRUD,
  postCrud,
  displayGetCRUD,
} from "../controllers/homecontroller";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCrud);
  router.get("/get-crud", displayGetCRUD);

  return app.use("/", router);
};
module.exports = initWebRoutes;
