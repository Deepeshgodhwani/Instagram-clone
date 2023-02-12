const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String, require: true },
  otp: { type: Number, require: true },
  expireTime: { type: Number, require: true },
});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;
