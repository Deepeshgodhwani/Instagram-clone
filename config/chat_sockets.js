
const messageModel= require('../models/messagesModel');
const Chat =require('../models/chatModel');
const User=require('../models/user');


module.exports.chatSockets=function(socketServer,){
  
      let io=require('socket.io')(socketServer,{
        pingTimeout:100000,
        cors: {
            origin: "*",
          }
      });
        
    
        io.on('connection',function(socket){
           console.log('new connection received ', socket.id);


           socket.on("disconnect", () => {
                console.log("socket disconnected"); 
          });


          socket.on('join_room',function(data){

              console.log('joining request rec.',data);
              socket.join(data.chatRoom);
              io.in(data.chatRoom).emit('user_joined',data);
          })


          //detect send_message and broadcast to everyone in the room //
        
          socket.on('send_message', async function(data){
        

            socket.join(data.chatRoom);
               let message=await messageModel.create({
                  sender:data.userId,
                  content:data.message,
                  chat:data.chatroom
              })
             
                let chat=await Chat.findById(message.chat);
                  chat.latestMessage=message._id;
                  chat.save();
                   
                  if(chat.users[0].userId!=data.userId){
                    var messageRecieverId=chat.users[0].userId;
                  }else{
                     var messageRecieverId=chat.users[1].userId;
                  }

                let user=await User.findById(messageRecieverId);
                 

                const details={
                  data:data,
                  reciever:user
                }
                
                io.in(data.chatRoom).emit('receive_message',details);
            })
      })


     
}
