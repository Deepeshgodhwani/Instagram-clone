const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User= require('../modules/user')

passport.use( new localStrategy({
    usernameField : 'email'
},
 function(email, password, done){
  
     User.findOne({email : email}, function(err, user){
         if(err){
             console.log('ERROR IN FINDING USER ---> PASSPORT');
              return done(err);
         }
         if(!user || password != user.password){
             console.log("INVALID USER/PASSWORD");
              return done(null , false)
         }
         
         return done(null, user)
        
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
    return res.redirect('/signin');
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