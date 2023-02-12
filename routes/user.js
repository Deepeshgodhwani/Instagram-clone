const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userProfileCont = require("../controllers/user_profile_cont");
const likes = require("../routes/likesRout");

router.get(
  "/user_home",
  passport.checkAuthenticatedUser,
  userController.homeuser
);
router.get(
  "/profile/:id",
  passport.checkAuthenticatedUser,
  userProfileCont.profile
);
router.post(
  "/update/profilepicture",
  passport.checkAuthenticatedUser,
  userProfileCont.update
);
router.get(
  "/update/profilepicture",
  passport.checkAuthenticatedUser,
  userProfileCont.update
);
router.get(
  "/editprofile",
  passport.checkAuthenticatedUser,
  userProfileCont.editProfile
);
router.post(
  "/editprofile/update",
  passport.checkAuthenticatedUser,
  userProfileCont.updateProfile
);

router.use("/post", require("../routes/post"));
router.use("/direct", require("./inbox"));
router.use("/profile/post", require("../routes/post"));
router.use("/liked", likes);
router.use("/comment", require("../routes/commentrout"));
router.use("/tofollow", require("./user_following"));
router.use("/search", passport.checkAuthenticatedUser, userController.users);

module.exports = router;
