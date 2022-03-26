const mongoose= require('mongoose');

const postSchema = mongoose.Schema({

    content : {

        type : String,
        require: true
    },
    user : {

        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }



},{
    timestamps : true
})



const post= mongoose.model('post', postSchema);


module.exports= post;