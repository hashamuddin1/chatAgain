const express = require("express");
const userRouter = express.Router();
const {
  userLogin,
  allUser,
  joinRoom,
} = require("../controller/userController");

userRouter.post("/api/v1/Login", userLogin);
userRouter.get("/api/v1/allUser", allUser);
userRouter.post("/api/v1/joinRoom", joinRoom);

module.exports = userRouter;
