
const User = require('../models/user');
const nodemailer =require('../config/nodemailer');
const OTP=require('../models/otp_model');


// To check login credentials and //

// To render singup page //

module.exports.signUP= function(req , res){


  if(req.isAuthenticated()){
        
      return res.redirect('/user/profile')
  }

  return res.render('signup')

}


//  sumbiting  signup form and sending  mail otp to the users //

module.exports.create= async function(req , res){

    try{
  
      if(req.body.password!=req.body.confirm_password)
      { 
               
              return  res.status(200).json({
                  errorType:"password",
                  message:"Password and confirm password does not match"
              })
  
      }
  
     let user=await User.findOne({email: req.body.email }) 
       let username=await User.findOne({username:req.body.username});
  
          if(user){
              return  res.status(200).json({
                  errorType:"User",
                  message:"User is already exist"
              })
          }else if(username){
  
              return  res.status(200).json({
                  errorType:"username",
                  message:"username already exist"
              })
              
          }else{
                 
                let otpCode=Math.floor((Math.random()*1000000)+1)
                let username=req.body.username.toLowerCase();
                let Otp =await OTP.create({
                  name:req.body.name,
                  username:username,
                  password:req.body.password,
                  email:req.body.email,
                  otp:otpCode,
                  expireTime:new Date().getTime() + 600*1000
                })
                
               
                let stringHtml= nodemailer.renderTemplate({data:Otp}, './email_verification.ejs')
                     
                nodemailer.transporter.sendMail({
                         
                   from:'deepeshgodwani28@gmail.com',
                   to:Otp.email,
                   subject: 'EMAIL VERIFICATION',
                   html:stringHtml
               
                 },function(err,info){
                     if(err){
                        console.log("error in sending email",err);
                        return  res.status(200).json({
                          errorType:"incorrect-email",
                          message:"email does not exist"
                      })
                     }else{
                          
                          return  res.status(200).json({
                            message:"email sent",
                            userEmail:req.body.email
                          });
                     }
                  })      
          }
    }catch(err){
             
          console.log("error in  verifying details",err);
    }   
  
  };



  // verify otp of user and create new user //
  
  module.exports.verifyUser= async function(req,res){
   
     try{
         
      let otp= await OTP.findOne({otp:req.body.otp})  
  
      if(otp){
            
             let currentTime = new Date().getTime();
             let diff= otp.expireTime-currentTime;
  
              if(diff>0){
  
                  let user=await User.create({
                       name:otp.name,
                       username:otp.username,
                       password:otp.password,
                       email:otp.email  
                   })
                   
                  const credentials={
                    username:user.username,
                    password:otp.password,
                  } 
                 
                  otp.remove();
                    
                   return  res.status(200).json({
                     succes:"user_created",
                     message:"email verified",
                     user:credentials

                  }) 
   
             }else{
                 
                  otp.remove();
                   return  res.status(200).json({
                    error:"otp_expired",
                     message:"otp expired"
                   })  
       }
  
      }else{
  
       return  res.status(200).json({
            error:"invalid_otp",
            message:"wrong otp enterd"
          })  
  
      }
         
  
     }catch(err){
       console.log("error in verifying and creating user",err)
     }               
  }

  
  // to render user home page //
  
  module.exports.createSession= function(req , res){
      
     
      return res.redirect('/user/user_home');
  
  };


  // when the username and password are incorrect //

  module.exports.credentialError=(req,res)=>{
             
          return res.render('signin',{
            type:1
          })
    
  }

  // to render email verification page for reset password //
   
  module.exports.emailVerification=function(req,res){

        res.render('email_verification_page',{
          error:false,
          page:'emailVerification'
        });
  }
   

  // sending password changing link to the user //


  module.exports.forgotPassword= async function(req,res){
    console.log("reached");
    
      try{    
            
        let  user = await User.findOne({email:req.body.email});
            
        if(user){
                  
          let stringHtml= nodemailer.renderTemplate({user:user}, './reset_password.ejs')
              
               nodemailer.transporter.sendMail({
                   
                   from:'deepeshgodwani28@gmail.com',
                   to:user.email,
                   subject: 'RESET PASSWORD',
                   html:stringHtml
         
           },function(err,info){
               
                 if(err){

                   console.log(err,"Error in sending mail");  
                  
                 }else{
                    
                    return  res.redirect(`/account/emailSent?email=${user.email}`);    
                 }
           })
   
    
        }else{
              
          return res.render('email_verification_page',{
            error:true,
            page:"success"
          })  
              
        }
           

      }catch(err){
         
           console.log("error in forgotting user",err)
      }  
  }
  

// on succefully email sent

module.exports.succesEmail=(req,res)=>{

  return  res.render('comp1.ejs',{
     email:req.query.email,
     page:"success"
  }) ;
}

  // to render reset password page //

  module.exports.renderPage = async function(req,res){
        try{
            
           
          let user = await User.findById(req.params.id);
          if(user){
           
             return res.render('resetPassword_page',{
                 User:user,
                 error:false,
                 page:"resetPassword"
             });
          }

        }catch(err){
           
            console.log("error in rendering page",err)
        }  
              

  }


  // to change password //

module.exports.resetPassword= async function(req,res){
  try{ 
             
         let user= await  User.findById(req.query.id);
         let error=null;
        if(req.body.password==req.body.confirm_password){   
            let check=await user.matchPassword(req.body.password);
          if(check){
              error={message:"Your new password is too similar to your current password. Please try another password"};
              return  res.render('resetPassword_page',{
                error:error,
                User:user
              })  
           }

             user.password=req.body.password;
             user.save();
              
             return  res.redirect(`/account/create-session?username=${user.username}&password=${user.password}`);

        }else{
          
           error={message:"Password and Confirm Password must be match."}
          return  res.render('resetPassword_page',{
            error:error,
            User:user
          }) 

        }
      

       

  }catch(err){

       console.log("error in changing password ",err)

  }

}


//  to log out session  //
  
  module.exports.destroySession= function(req, res){
  
      req.logout();
  
      return res.redirect('/')
  }