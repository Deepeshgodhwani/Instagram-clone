
const User = require('../models/user')
const post =require('../models/post')
const Following=require('../models/following');
const fs=require('fs');
const path= require('path');


module.exports.homeuser = async function(req ,res){
    

 try{
    let posts= await post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path:'likes',
            populate:{
                path:'user'
            }
         })
         .populate({
                     path : 'comments',
                      populate: {
                                  path : 'user'
                       },
                       populate:{
                        path:'likes',
                        populate :{
                            path:'user'
                        }
                       }
                    })   
                    
 let users= await  User.find({})
  let user = await User.findById(req.user._id);
    let user_following= await Following.find({user:user._id});
    // console.log(user_following);
   

 req.flash('success', "REACHED PROFILE !!")
    return res.render('user_home', {

      tittle: 'USER HOME',
      post : posts,
      users: users,
      User_following:user_following


      })
 
}catch(err){
   
      console.log("ERROR IN FETCHING POST AND USER", err)
      return res.redirect('back')
}
};



module.exports.signin= function(req , res){

    
    if(req.isAuthenticated()){
          
        return  res.redirect('/user/profile')
   }


    return res.render('user_signin',{

        title : 'SIGN-IN'

    })
}
 


module.exports.signup= function(req , res){
       
        if(req.isAuthenticated()){
          
             return res.redirect('/user/profile')
        }
    
        
        return res.render('user_signup',{
    
           title : 'SIGN-up'

        })
}



module.exports.create= function(req , res){

    if(req.body.password !=req.body.confirm_password)
    {
            return  res.redirect('back')

    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err)
        {
           console.log("error in finding user")
           return;      
        } 
        
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating user");
                    return res.redirect('back') ; 
                   }
                 
                return res.redirect('/user/signin');   

            })
        }else{

            return  res.redirect('back');
            
        }


    })

};



module.exports.createSession= function(req , res){


    req.flash('success', 'successfully logged in')
    
    return res.redirect('/user/user_home');
};


module.exports.destroySession= function(req, res){

    req.logout();
    req.flash('success', 'successfully logged out ')
    return res.redirect('/')
}

