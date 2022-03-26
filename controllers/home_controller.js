
const post = require('../modules/post')



module.exports.home= function(req , res){


    post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {

            post : posts
    
        })

    })

}


