const mongoose = require("mongoose");

const followersSchema = mongoose.Schema(
  {
    followers: {
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

const followers = mongoose.model("followers", followersSchema);
module.exports = followers;
