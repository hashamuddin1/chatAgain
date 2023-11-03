const express = require("express");
const userRouter = express.Router();
const {
  userLogin,
  allUser,
  joinRoom,
  sendMessage,
} = require("../controller/userController");

userRouter.post("/api/v1/Login", userLogin);
userRouter.get("/api/v1/allUser", allUser);
userRouter.post("/api/v1/joinRoom", joinRoom);
userRouter.post("/api/v1/sendMessage", sendMessage);

module.exports = userRouter;
