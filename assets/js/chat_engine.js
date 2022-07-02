

class chatEngine{
    constructor(chatBoxId,username){

        this.chatBox=$(`#${chatBoxId}`);
        this.username=username;
        this.socket=io.connect('http://localhost:5000');

        if(this.username){
            this.connectionHandler();
        }
    }
    connectionHandler(){

        let self=this;

        
              
          this.socket.on('connect',function(){
               
                 console.log('connetion established  using sockets ....!');
          });


          self.socket.emit('join_room',{
            user_email:self.username,
            chatRoom:"codeial"
          })


          self.socket.on('user_joined',function(data){
                  console.log("a user joined ",data)
          })

    //   send a message on clicking the send message button //

          $('.send-Button').click(function(){
               console.log("hello");
                   let msg= $('#text').val();

                  

                   if(msg!=''){
                    console.log(msg);
                     self.socket.emit('send_message',{
                        message:msg,
                        username:self.username,
                        chatroom:'codeial',
                    });
                };
        });

     self.socket.on('receive_message',function(data){
                
        console.log("message received" ,data.message);

       let newMessage=$('<li>');

       let messageType='other-message';

       if(data.username==self.username){
            messageType='self-message';
       }

       newMessage.append($('<span>',{
          'html':data.message
       }))

       newMessage.append($('<sub>',{
            'html':data.username
       }))

       newMessage.addClass(messageType);

           $('#chat-message-list').append(newMessage);
      })    

   }
}   