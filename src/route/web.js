import express from "express";
import { getHomePage, getCRUD, postCrud } from "../controllers/homecontroller";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCrud);

  return app.use("/", router);
};
module.exports = initWebRoutes;
