const mongoose =require('mongoose');


const messageSchema=mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true

    },
    content:{
        type:String,
        trim:true,
        require:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chats',
        require:true
        
    }

})


const messages =mongoose.model('messages',messageSchema);
module.exports=messages;  