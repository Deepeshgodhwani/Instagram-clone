
const userPost= require('../modules/post')

module.exports.userPosts=  function(req, res){

         userPost.create({
             content : req.body.content,
              user : req.user._id
         },function(err , user){

            console.log(err || 'POST SAVED SUCCESSFULY')
         })

         return res.redirect('back', {
         })
         
         
}