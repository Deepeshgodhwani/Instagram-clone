const mongoose = require("mongoose");

const followingSchema = mongoose.Schema(
  {
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const following = mongoose.model("following", followingSchema);
module.exports = following;
