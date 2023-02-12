const express = require("express");
const userController = require("../controllers/user_controller");
const accountCont = require("../controllers/account_cont");
const passport = require("passport");

const router = express.Router();

router.get("/signin", passport.checkAuthenticatedUser, userController.signin);
router.get("/signup", accountCont.signUP);
router.post("/forgot-password", accountCont.forgotPassword);
router.get("/password/reset/:id", accountCont.renderPage);
router.post("/reset", accountCont.resetPassword);

router.get("/enteremail", accountCont.emailVerification);
router.get("/emailSent", accountCont.succesEmail);

router.post("/create", accountCont.create);
router.post("/verify-email", accountCont.verifyUser);

router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/account/credentialError",
  }),
  accountCont.createSession
);
router.get(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  accountCont.createSession
);
router.get("/credentialError", accountCont.credentialError);
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  accountCont.createSession
);
router.get("/signout", accountCont.destroySession);

module.exports = router;
