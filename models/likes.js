const mongoose = require("mongoose");

const likeSchema= mongoose.Schema({
    
    // user which like the object
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        require: true
    },
    // object on which the like is done it would either post or comment
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onmodel'
    },
    onmodel:{
        type:String,
        require:true,
        enum:['Post','Comment']

    }
},{
  
    timestamps:true
}
)

const likes=mongoose.model('likes',likeSchema);
module.exports=likes;