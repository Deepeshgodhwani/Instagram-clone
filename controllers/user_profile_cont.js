const User = require('../models/user')
const post =require('../models/post')
const Following=require('../models/following');
const fs=require('fs');
const path= require('path');

module.exports.profile = async function(req ,res){
     
    try{
         
        let loguser= await User.findById (req.user.id).populate('following');
    

        let user= await User.findById(req.params.id)
        .populate({
               path :'posts',
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
                  following:isfollowing

                  
   
           })
       

    }catch(err){
        console.log("error in profile page",err)
    }
   
    
};

// to change profile picture //

module.exports.update = async function(req ,res){

           
      if(req.user.id == req.query.id){          
         
    try{
       
           console.log(req.query);
            
        let user = await User.findById(req.query.id)
          
          
        User.uploadedAvtar(req , res, function(Err){
            if(Err)
            {
                console.log("error in ****multer",Err)
            }else{

               if(req.file){

                   if(user.avtar){

                          fs.unlinkSync(path.join(__dirname,'..',user.avtar));  
                      
                   }
                  
                        
                    user.avtar= User.avtarPath + '/' + req.file.filename;
                    user.save();
               }else{
                    
                      user.update({unset:{avtar:1}});
                      user.avtar=undefined;
                      user.save();
                      fs.unlinkSync(path.join(__dirname,'..',user.avtar));  
                     
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

    let user=await User.findById(req.query.id)

       
   return res.render('edit_user_profile' ,{
       
         User:user
   });

}

   
// to edit profile of the user //

module.exports.updateProfile= async function(req,res){

       try{
             
            let user= await User.findById(req.query.id);
                console.log(req.body);
            
               if(user.password==req.body.password){

                

                  
            // when profile form is submitted //    
                       if(req.query.type=='profile'){
                            
                           if(req.body.name){
                             user.name=req.body.name;
                               
                           }
                           if(req.body.bio){
                            user.bio=req.body.bio;
                                
                           }
                            user.save();
                          
                       }else{
                             
            //  when password changing form is submitted //           
                              if(req.body.newPassword==req.body.ConfirmNewPassword){
                                   
                                     user.password=req.body.newPassword;
                                     user.save();
                              }
                       }

               }

            return res.redirect('back');
       }catch(err){
         console.log("error in updating profile" .err)
       }
}