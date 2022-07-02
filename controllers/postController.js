   
const userPost= require('../models/post');
const Comment= require('../models/comment');
const User= require('../models/user');
const Likes=require("../models/likes");
const fs=require('fs');
const path=require('path');


module.exports.postSection=function(req ,res){

  
       return res.render('postsection');
}

module.exports.userPosts=   function(req, res){

     userPost.uploadedPost (req,res,function(err){
         if(err){

            console.log("error in postcontroller",err)
         }else{

             console.log(req.file);   

              userPost.create({
               content : userPost.path+'/'+req.file.filename,
               user : req.user._id,
               caption:req.body.caption

           },function(err,post){

                  if(err){console.log("error in creating post",err)}


               User.findById(post.user,function(err,user){
                        if(err){console.log("error in finding user in creating post ",err)}

                        user.posts.push(post);
                        user.save();
               })  
                       
   //      if(req.xhr){

   //             return res.status(200).json({

   //              data: {
   //               post: post,
                 
     
   //           },message : 'Post Created !!'
        
   //     })

   //   }
             return res.redirect('/user/user_home');


           });
               
         }  
       }
      )
    



          
      
};


module.exports.deletePost= async function(req, res){
  
   try{
       
      let post = await userPost.findById(req.params.id)
      
          

          if(post.user == req.user.id){
              
               fs.unlinkSync(path.join(__dirname,'..',post.content)) 
            await Likes.deleteMany({likeable:post, onmodel: 'Post'});
            await Likes.deleteMany({_id: {$in:post.comments}});
            User.findById(post.user,function(err,user){
                    if(err){console.log("error in finding user to delete post")}

                    user.posts.pull(post);
                    user.save();
            })

                post.remove()
                req.flash('success', 'Post Deleted !!')
                 
                if(req.xhr){

                    return res.status(200).json({

                         data: {
                             post_id :req.params.id
                         },
                         message: 'POST DELETED !!'
                    })
      
                        
                  
                }
                 await Comment.deleteMany({ post : req.params.id})
                
                  return res.redirect('back')       
          
          }else{
             return  res.redirect('back')
             
          }

   }catch(err){
      console.log("ERROR IN DELETING POST", err)
   }
      
}

module.exports.postview= async function(req,res){

   try{
         
    let post= await userPost.findById(req.params.id)
    .populate('user')
    .populate({
                path : 'comments',
                 populate: {
                             path : 'user'
                  }
               })   

    
    return res.render('post-view',{
        
        posts:post
    });

        
   }catch(err){

   }
}