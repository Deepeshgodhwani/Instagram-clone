const passport = require('passport');
const facebookStrategy= require("passport-facebook").Strategy
const crypto =require('crypto');
const User= require('../models/user');
const env= require('./environment');



passport.use( new facebookStrategy({

    clientID: env.facebook_client_id,
    clientSecret:env.facebook_client_secret,
    callbackURL:env.facebook_call_backURL

 },function(accessToken,refreshToken,profile,done){
       console.log(profile);
        User.findOne({email:profile.displayName}).exec(function(err, user){
            
             if(err){console.log(err, "error in finding user") ; return ;}
               if(user){
                  //if user found set this  as req.user

                return done(null,user);   
              }else{
                   
                    //if not found ,create the user and set it as req.user
    
                   User.create({
                    name: profile.displayName,
                    email: profile,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("ERROR IN CREATING USER IN FACEBOOK STRATEGY",err);
                        return done(null,user);
                    }
                })
              }
        })
}

 ))