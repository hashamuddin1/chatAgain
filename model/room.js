const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const rooms = new mongoose.model("room", roomSchema);

module.exports = { rooms };
