

module.exports.chatSockets=function(socketServer,){
  
      let io=require('socket.io')(socketServer,{
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

          socket.on('send_message',function(data){

            console.log(data);
            socket.join(data.chatRoom);
            io.in(data.chatRoom).emit('receive_message',data);
          })
      })


     
}
