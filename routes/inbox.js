const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../controllers/messagesCont");

router.get(
  "/inbox",
  passport.checkAuthenticatedUser,
  controller.messagesSection
);

module.exports = router;
