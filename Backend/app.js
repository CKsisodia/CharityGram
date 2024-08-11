const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./db/database");

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cors());
app.options("*", cors());

sequelize
  .sync()
  .then(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
