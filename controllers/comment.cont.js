
const userPost= require('../models/post')
const Comments= require('../models/comment')
const likes=require("../models/likes");
// const commentsMailer =require('../mailers/commentMailer');
// const commentMailerWorker =require('../workers/comment-email-worker');
// const queue =require('../config/kue');
module.exports.userComment=  function(req, res){

       userPost.findById(req.body.post, function(err, post){

         if(post){
              Comments.create({    

                 content : req.body.comment,
                 user : req.user._id,
                 post : req.body.post

              },function(err, comment){
                 if(comment){
                 
               //     Comments.findById(comment._id).populate('user').exec(function(err ,coment){
                        
               //       let job= queue.create('email',coment).save(function(err){

               //              if(err){
               //                   console.log("error in giving task to queue",err);
               //                   return;
               //              }

               //              console.log('job established', job.id);
               //          });                   

               //     })
                  
                   req.flash('success', 'Comment Published!!')  
                   post.comments.push(comment)
                   post.save();
                        
               
                 }else{

                    req.flash('error', err);
                 }

                  return res.redirect('back')
                
              }) 
            }
       })
         
         
}


module.exports.deleteComments= async function(req, res){


     try{

          console.log(req.params.id);          
      let comments  = await Comments.findById(req.params.id)

      if(comments.user== req.user.id){
             
           likes.deleteMany({likeable:comments,onmodel:'Comment'})
          let postId= comments.post


          comments.remove();
          let post = userPost.findByIdAndUpdate(postId, {$pull: {comments :req.params.id}});  
   
         req.flash('success', 'Comment Deleted !!') 
         return res.redirect('back');
         
     }else{
          console.log('EROROROROROROR')
          return res.redirect('back')
     }

     }catch(err){
       
          console.log("ERROR IN DELETING COMMENTS", err)
     }
     
}

