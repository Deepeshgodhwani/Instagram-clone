const mongoose= require('mongoose');

const chatSchema = mongoose.Schema({
  
        users: [
          {
            userId:{
                
              type:mongoose.Schema.Types.ObjectId,
              ref:'user'
            }
          }
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'messages'

        },
         
       },{
        timestamps:true
       }
       )


const chat =mongoose.model('chat',chatSchema);
module.exports=chat;       