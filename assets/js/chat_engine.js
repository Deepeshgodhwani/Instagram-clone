

class chatEngine{
    constructor(chatBoxId,username,userId){

        this.userId=userId
        this.chatroom=chatBoxId
        this.username=username;
        this.socket=io.connect('http://localhost:5000');
        if(this.username){
            this.connectionHandler();
        }
    }
    connectionHandler(){

        let self=this;
        
          this.socket.on('connect',function(){
            $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 1);
                 console.log('connetion established  using sockets ....!');
          });
        
       if(self.chatroom){


        self.socket.emit('join_room',{
            username:self.username,
            chatRoom:self.chatroom
        })


          self.socket.on('user_joined',function(data){
                 
                // to indicate user is online   //

                   if(self.username!=data.username)
                   {
                    
                    $('.usernam').css({marginTop:'1rem',marginBottom:'-20px'});
                    $('.status').css({display:"flex"});
                   }
                  console.log("a user joined ",data)
          })

    //   send a message on clicking the send message button //

          $('.send-Button').click(function(){
            $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 500);
                   let msg= $('#text').val();
                   $('#text').val("");
                   if(msg!=''){
                    console.log(msg);
                     self.socket.emit('send_message',{
                        username:self.username,
                        message:msg,
                        userId:self.userId,
                        chatroom:self.chatroom,
                    });
                };
          });

    //   send a message on clicking the  enter //


          $('#text').keypress(function(e){
              if(e.key==="Enter"){
                $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 500);
                let msg= $('#text').val();
                $('#text').val("");

                if(msg!=''){
                 console.log(msg);
                  self.socket.emit('send_message',{
                     username:self.username,
                     message:msg,
                     userId:self.userId,
                     chatroom:self.chatroom,
                 });
             };
              }
          })

     self.socket.on('receive_message',function(data){
                
        // console.log("message received" ,data.message);
      $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 1);
         console.log(data);
        
         let loggedUser=$('#recent-chat-list').attr('loggedUser');
         console.log(data.messageRecieverId);
         console.log(data.data.userId);
         console.log(loggedUser);
     

            let latestChatHead=$(`.Id${data.messageRecieverId}`);
            if(latestChatHead.length==0){
                latestChatHead=$(`.Id${data.data.userId}`);    
                $('.usernam').css({marginTop:'1rem',marginBottom:'-20px'});
                $('.status').css({display:"flex"});
            }
            let link=latestChatHead.attr('href');
            let username=latestChatHead.attr('name');
            let avtar=latestChatHead.attr('avtar');
            
            latestChatHead.remove();
            $('#recent-chat-list').prepend(`<div id="chat"> <a class="Id${data.messageRecieverId}" avtar="${avtar}" name="${username}" href="${link}">
            <img id="user-avtar" src="${avtar}">
            <div >
            <p id="user-name">${username}</p>
            <p  id="latestMessage">${data.data.message.slice(0,30)}</p>
            </div>
            </a>  </div>`)
        
       
       let newMessage=$('<li>');

       let messageType='other-message';

       if(data.data.username==self.username){
            messageType='self-message';
       }

       newMessage.append($('<span>',{
          'html':data.data.message
       }))

       newMessage.addClass(messageType);

           $('#chat-message-list').append(newMessage);
      }) 


       }
            

   }
}   


// to close search bar 
$('#page').click(function(){
    $('.searchResult').css({display:"none"})
    $('#close').css({display:"none"});
    $('#logo').css({display:"flex"})
    $('.loading').css({display:'none'});
    $('.search').val('');
})