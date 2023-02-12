const express = require("express");
const router = express.Router();
const passport = require("passport");
const likes = require("../controllers/likesController");

router.get("/toggle", passport.checkAuthenticatedUser, likes.liked);

module.exports = router;
