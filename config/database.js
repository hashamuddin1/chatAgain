//DATABASE CONNECTION
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/chatHasham")
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
