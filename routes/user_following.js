const express = require("express");
const router = express.Router();
const passport = require("passport");
const followingCont = require("../controllers/user_following");

router.get(
  "/following",
  passport.checkAuthenticatedUser,
  followingCont.following
);

router.get(
  "/followers",
  passport.checkAuthenticatedUser,
  followingCont.userFollowers
);
router.get(
  "/userFollowings",
  passport.checkAuthenticatedUser,
  followingCont.usersFollowing
);
module.exports = router;
