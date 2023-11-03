const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 4500;
const { Server } = require("socket.io");
const io = new Server(server);
require("./config/database");
const userRouter = require("./router/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.use(express.static("public"));
app.use([userRouter]);

io.on("connection", (socket) => {
  socket.on("joinChat", (connUserName) => {
    console.log(`${connUserName} Connected`);
    io.emit("joinChat", `${connUserName} Connected`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    io.emit("chat message", `User Disonnected`);
  });

  socket.on("startTyping", (msg) => {
    io.emit("startTyping", msg);
  });

  socket.on("endTyping", (msg) => {
    io.emit("endTyping", msg);
  });

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId.toString());
  });
});

server.listen(port, () => {
  console.log(`Server Listening On Port ${port}`);
});
