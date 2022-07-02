const Following =require('../models/following');
const Followers= require('../models/followers');
const User =require('../models/user');


module.exports.following= async function(req,res){

        try{
            isAlreadyFollowing= await Following.findOne({
                following:req.query.id,
                user:req.user._id
            })
            
            if(isAlreadyFollowing){
                  
                  //first deleted from the user1 following
                 
                 await Following.findByIdAndDelete(isAlreadyFollowing._id);
                   let user1 = await User.findById(req.user._id);
                   user1.following.pull(isAlreadyFollowing);
                   user1.save();
                   
                   

                   //then from followers of user 2

                  let follower= await Followers.findOneAndDelete({
                        followers:req.user._id ,
                        user:req.query.id
                        
                   })
                    
                   let user2= await User.findById(req.query.id)
                   user2.followers.pull(follower);
                   user2.save();

                   if(req.xhr){

                    return res.status(200).json({
                     
                        data:{
                            following:user1.following,
                            userId:user2._id
                        },
                        message:"success in to unfollow the user "
 
                   })

                   }

               


            }else{

                
            // user2 whom user1 follow //
              let whomFollowing=  await Following.create({
                following:req.query.id,
                user:req.user._id
               })
              
                let user1 = await User.findById(req.user._id);

                 user1.following.push(whomFollowing);
                 user1.save();

                 // following of user 1 is follower of user 2

                    let follower= await Followers.create({
                            followers:req.user._id ,
                            user:req.query.id
                    })
                    let user2= await User.findById(req.query.id)

                     user2.followers.push(follower);
                     user2.save();
                    
                   if(req.xhr){
                       

                    return res.status(200).json({
                     
                        data:{
                            following:user1.following,
                            userId:user2._id
                        },
                        message:"success in to follow the user "
 
                   })

                   }  

                     

            }

        }catch(error){
            console.log("error in following user",error);
        }
        
         return res.redirect('back')
}