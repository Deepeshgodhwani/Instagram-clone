const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User= require('../models/user')

passport.use( new localStrategy({
    usernameField : 'username',
    passReqToCallback: true
},
 function(req,username, password, done){
    User.findOne({username:username}, function(err,user){
        if(err){

            console.log(err);
        }
         if(!user){  
             User.findOne({email : username}, function(err,userr){
                // console.log(userr);
                if(err){
                    req.flash('error', err)
                     return done(err);
                } 
    
            if(!userr || password != userr.password){
                req.flash('error','INVALID USER/PASSWORD');
                 return done(null , false)
            }
                
            return done(null, userr)
          })
        }else{

            if(!user || password != user.password){
                req.flash('error','INVALID USER/PASSWORD');
                 return done(null , false)
            }
                
            return done(null, user)
               
        }      
     });
    

}
));

//serializing the user to decide which key is to be kept in the cookies//


passport.serializeUser(function(user,done){
       return done(null , user.id);

})


//deserializing the user from the key in the cookies//

passport.deserializeUser(function(id, done){
     User.findById(id, function(err, user){
         if(err){

            console.log('ERROR IN FINDING USER ---> PASSPORT');
             return done(err);
             
         }
         return done(null, user);
     });
});

//check if the user is authenticated //
passport.checkAuthenticatedUser= function(req ,res ,next)
{
    if(req.isAuthenticated())
    {
         return next();
    }
    return res.redirect('/user/signin');
}

//

passport.setAuthenticatedUser= function(req , res , next){
   //req.user contains the correct signed in user from the session cookie  and we are just sending this 
   // to the locals for the veiws//
    if(req.isAuthenticated()){
         res.locals.user= req.user;
    }

    next();
}

module.exports= passport;