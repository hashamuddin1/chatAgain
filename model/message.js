const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "room",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    text: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const messages = new mongoose.model("message", messageSchema);

module.exports = { messages };
