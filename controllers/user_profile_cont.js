const User = require('../models/user')
const post =require('../models/post')
const Following=require('../models/following');
const fs=require('fs');
const path= require('path');


// rendering profile page  //
module.exports.profile = async function(req ,res){
     
    try{
         
        let loguser= await User.findById (req.user.id).populate('following');
    
         
        let user= await User.findById(req.params.id)
        .populate({
               path :'posts',
               options:{sort:'-createdAt'},
               populate:{
                   path:'comments',
                   populate:{
                      path:'user'
                   },
                   populate:{
                      path:'likes'
                   }
                
               },populate:{
                   path:'likes',
                   populate:{
                      path:'user'
                   }
                }
               })
          
           let isfollowing =false; 
           for( i of loguser.following){
                if(i.following.toString()==user._id.toString()){
                    isfollowing=true;
                       
                }
              
           }
               
         return res.render('userprofile', {
                  user_profile: user,
                  following:isfollowing,
                  page:"profile"              
           })
       

    }catch(err){
        console.log("error in profile page",err)
    }
   
    
};

// to change profile picture //

module.exports.update = async function(req ,res){

           
      if(req.user.id == req.query.id){          
         
    try{
       
            
        let user = await User.findById(req.query.id)   
          
        User.uploadedAvtar(req , res, function(Err){
            if(Err)
            {
                console.log("error in ****multer",Err)
            }else{

               if(req.file){
                   
                  let defaultAvtar="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg";
                   if(user.avtar&&user.avtar!=defaultAvtar){

                          fs.unlinkSync(path.join(__dirname,'..',user.avtar));  
                      
                   }              
                    user.avtar= User.avtarPath + '/' + req.file.filename;
                    user.save();
               }else{
                    
                      fs.unlinkSync(path.join(__dirname,'..',user.avtar));  
                      user.update({unset:{avtar:1}});
                      user.avtar=undefined;
                      user.save();
                     
               }               
                return res.redirect('back');}

        })
    }catch(err){ 
        console.log("ERROR IN UPDATING USER", err)
        return res.redirect('back')
        
    }

    }else{
                 
        return res.status(401).send('Unauthorized');
     }

};

   

// to render edit profile page //


module.exports.editProfile= async function(req,res){

    try{
         
        let user=await User.findById(req.query.id);
        return res.render('edit_user_profile' ,{
            
              User:user,
              page:"edit_profile"
        });
        
    }catch(error){
          console.log("error in rendering edit profile page",error)
    }

  

}

   
// to edit profile of the user //

module.exports.updateProfile= async function(req,res){

       try{
             
            let user= await User.findById(req.query.id);
              let passwordCheck=await user.matchPassword(req.body.password);
              
               if(passwordCheck){
                  
            // when profile form is submitted //    
                       if(req.query.type=='profile'){
                           
                           if(req.body.username){
                                   
                                   let check= await User.findOne({'username':req.body.username.toLowerCase()});
                                    
                                   if(check&&user.username!=req.body.username){
                                       return res.status(201).json({
                                        error:"username alredy exist"
                                       })
                                   }else{
                                      user.username=req.body.username.toLowerCase();
                                   }
                                   
                            }  

                           if(req.body.name){
                               user.name=req.body.name;
                           }


                           if(req.body.bio){
                               user.bio=req.body.bio;    
                           }

                           user.save();
                           if(req.xhr){
                              return res.status(201).json({
                                 user:user
                              })
                           }
                           return res.redirect('back');
                          
                       }else{
                             
            //  when password changing form is submitted //           
                            if(req.body.password==req.body.newPassword||req.body.ConfirmNewPassword==req.body.password){
                                    return res.status(201).json({error:"same password"}) ;
                             }else if(req.body.newPassword==req.body.ConfirmNewPassword){
                                     user.password=req.body.newPassword;
                                     user.save();
                                     if(req.xhr){
                                        return res.status(201).json({
                                            message:"password is changed"
                                        })
                                     }
                              }else{
                                return res.status(201).json({
                                    error:"passandconf",
                                    message:"password and confirm password should match"
                                })  
                              }

                              return res.redirect('back');
                       }

               }else{
                    
                    if(req.xhr){
                          return res.status(201).json({
                              error:"wrong password"
                          })
                    }
                    return res.redirect('back');
               }

       }catch(err){
         console.log("error in updating profile" .err)
       }
}