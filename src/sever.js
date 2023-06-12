import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();

let app = express();
let port = process.env.PORT || 6969;
console.log(port);
// config app
// Cấu hình các tham số phía client gửi lên
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);

initWebRoutes(app);

app.listen(port, () => {
  console.log(`sever running ${port}`);
});
