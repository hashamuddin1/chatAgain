const mongoose = require("mongoose");

const groupUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const groupUsers = new mongoose.model("groupUser", groupUserSchema);

module.exports = { groupUsers };
