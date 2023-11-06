const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 4500;
const { Server } = require("socket.io");
const io = new Server(server);
require("./config/database");
const userRouter = require("./router/userRoute");
const { messages } = require("./model/message");
const { groupUsers } = require("./model/groupAvailibleUser");
const { writeFile } = require("fs");
const path = require("path");
const filePath = path.join("./upload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});


app.use(express.static("public"));
app.use("/upload", express.static(__dirname + "/upload"));

app.use([userRouter]);

io.on("connection", (socket) => {
  socket.on("joinChat", async (connUserName) => {
    await joinGroupChat(connUserName);
    const allUser = await fetchAllGroupUser();
    io.emit("AllGroupUser", allUser);
    io.emit("joinChat", `${connUserName} Connected`);
  });

  socket.on("upload", ({fileData, fileName, fileType}, callback) => {
    writeFile(`${filePath}/${fileName}`, fileData, (err) => {
      callback({ message: err ? "failure" : "success" });
    });
  });

  socket.on("userNameDisconnect", async (connUserName) => {
    await deleteGroupChat(connUserName);
    const allUser = await fetchAllGroupUser();
    io.emit("AllGroupUser", allUser);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    io.emit("disconnectUser", `User Disonnected`);
    io.emit("chat message", `User Disonnected`);
  });

  socket.on("startTyping", (msg) => {
    io.emit("startTyping", msg);
  });

  socket.on("endTyping", (msg) => {
    io.emit("endTyping", msg);
  });

  socket.on("startTypingPrivate", (msg) => {
    io.emit("startTypingPrivate", msg);
  });

  socket.on("endTypingPrivate", (msg) => {
    io.emit("endTypingPrivate", msg);
  });

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId.toString());
    const allMessage = await extractMessageOfRoom(roomId.toString());
    io.in(roomId.toString()).emit("allMessage", allMessage);
  });

  socket.on("sendMessage", (data) => {
    io.in(data.roomId.toString()).emit("receiveMessage", data.text);
  });
});

async function deleteGroupChat(usernameUser) {
  try {
    await groupUsers.deleteOne({ userName: usernameUser });
  } catch (e) {
    console.log(e);
  }
}

async function extractMessageOfRoom(roomId) {
  try {
    const fetchMessage = await messages.find({ roomId: roomId });
    return fetchMessage;
  } catch (e) {
    console.log(e);
  }
}

async function joinGroupChat(usernameUser) {
  try {
    const insertGroupUser = new groupUsers({
      userName: usernameUser,
    });
    await insertGroupUser.save();
  } catch (e) {
    console.log(e);
  }
}

async function fetchAllGroupUser() {
  try {
    const fetchUser = await groupUsers.find();
    return fetchUser;
  } catch (e) {
    console.log(e);
  }
}

server.listen(port, () => {
  console.log(`Server Listening On Port ${port}`);
});
