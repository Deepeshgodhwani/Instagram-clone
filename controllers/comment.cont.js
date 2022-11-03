
const userPost= require('../models/post')
const Comments= require('../models/comment')
const likes=require("../models/likes");



module.exports.userComment= async function(req, res){
         
     try{

          let post=await userPost.findById(req.body.post);

         if(post){
            let comment= await Comments.create({    

                 content : req.body.comment,
                 user : req.user._id,
                 post : req.body.post

              })
              
              if(comment){
                 
                   let coment =await Comments.findById(comment._id).populate('user')
                   
                    post.comments.push(comment);
                    post.save();
               
                       return res.send({
                          comment:coment,
                          userId:req.user.id
                       })
                        
               }
               
               return res.redirect('back'); 
            }

     }catch(err){
          console.log("error in posting comment",err);
     }              
}


module.exports.deleteComments= async function(req, res){


     try{
     
      let comments  = await Comments.findById(req.params.id)

      if(comments.user== req.user.id){
             
           likes.deleteMany({likeable:comments,onmodel:'Comment'})
          let postId= comments.post


          comments.remove();

          let post = await userPost.findByIdAndUpdate(postId, {$pull: {comments :req.params.id}});  
          
          if(req.xhr){
               return res.status(201).json({
                    commentId:req.params.id
               })
          }
         return res.redirect('back');
         
     }else{
          console.log('EROROROROROROR')
          return res.redirect('back')
     }

     }catch(err){
       
          console.log("ERROR IN DELETING COMMENTS", err)
     }
     
}

