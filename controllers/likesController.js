const Likes=require('../models/likes');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.liked= async function(req,res){
    
        try{
            let Likable;
            let deleted=false;    
            if(req.query.type=='Post'){
                Likable= await Post.findById(req.query.id).populate('likes')
            }else{
                Likable= await Comment.findById(req.query.id).populate('likes')

            }
            
            // checking like is done by user is exist or not
             
           let existinglike= await Likes.findOne({
             likeable:req.query.id,
             onmodel:req.query.type,
             user:req.user._id
           })
                
                //  if exist then delete it
            if(existinglike){
                
                Likable.likes.pull(existinglike._id);
                Likable.save();
                existinglike.remove();
                deleted=true;

               if(req.xhr){
                     
                   return res.status(200).json({
                      data:{
                          Deleted:deleted
                      }
                   })
               }       
                

                // else create that like

            }else{
                newLike=await Likes.create({
                    user:req.user._id,
                    likeable:req.query.id,
                    onmodel:req.query.type
                })
                 Likable.likes.push(newLike._id);
                 Likable.save();
                 deleted=false;
                 if(req.xhr){
                      
                    return res.status(200).json({
                        data:{
                            Deleted:deleted
                        }
                    })
                 }
            }

        }catch(err){
              console.log("error in like post or comment",err)
        }
}