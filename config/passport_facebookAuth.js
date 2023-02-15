const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

passport.use(
  new facebookStrategy(
    {
      clientID: env.facebook_client_id,
      clientSecret: env.facebook_client_secret,
      callbackURL: env.facebook_call_backURL,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ userId: profile.id }).exec(async function (err, user) {
        if (err) {
          console.log(err, "error in finding user");
          return;
        }
        if (user) {
          //if user found set this  as req.user

          return done(null, user);
        } else {
          //if not found ,create the user and set it as req.user
          let checkUser = await User.findOne({ username: profile.displayName });
          if (checkUser) {
            return done(null, false);
          }
          User.create(
            {
              name: profile.displayName,
              username: profile.displayName,
              userId: profile.id,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("ERROR IN CREATING USER IN FACEBOOK STRATEGY", err);
                return done(null, false);
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
