const { users } = require("../model/user");
const { rooms } = require("../model/room");

const userLogin = async (req, res) => {
  try {
    const checkEmail = await users.findOne({ userName: req.body.userName });
    if (!checkEmail) {
      const adduser = new users({
        userName: req.body.userName,
      });

      await adduser.save();
      return res.send({
        status: 200,
        message: "User Has Been Created  Successfully",
        data: adduser,
      });
    } else {
      return res.send({
        status: 200,
        message: "User Has Been Login Successfully",
        data: checkEmail,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const allUser = async (req, res) => {
  try {
    const fetchUser = await users.find({});
    return res.send({
      status: 200,
      message: "All User Has Been Fetched Successfully",
      data: fetchUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const joinRoom = async (req, res) => {
  try {
    const fetchRoom = await rooms.findOne({
      users: [req.body.userId, req.body.secondUserId],
    });

    const fetchRoomAgain = await rooms.findOne({
      users: [req.body.secondUserId, req.body.userId],
    });
    if (fetchRoom || fetchRoomAgain) {
      return res.send({ message: "already exist" });
    }

    const createRoom = new rooms({
      users: [req.body.userId, req.body.secondUserId],
    });

    await createRoom.save();
    return res.send({ success: true, data: createRoom });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { userLogin, allUser, joinRoom };
