




class chatEngine{
    constructor(chatBoxId,username,userId,user2){

        this.userId=userId
        this.chatroom=chatBoxId
        this.username=username;
        this.user2=user2;
        this.socket=io.connect('http://localhost:5000');
        if(this.username){
            this.connectionHandler();
        }
    }
    connectionHandler(){

        let self=this;
        if(self.user2){
            $(`.Id${self.user2}`).css({backgroundColor:"rgb(239,239,239)"});
        }
          this.socket.on('connect',function(){
            let element=$("#chat-message-list");
            if(element.length){
                element.stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 1);
            }
          });
        
          self.socket.emit('setup',{
          userId:self.userId,
          name:self.username
          })


    //   send a message on clicking the send message button //
        if(self.chatroom){

        
          $('.send-Button').click(function(){
              $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 500);
                   let msg= $('#text').val();
                   $('#text').val("");
                   if(msg!=''){
                    let newMessage=$('<li>');  
                    let messageType='self-message';
                    newMessage.append($('<span>',{
                        'html':msg
                     }))
                     newMessage.addClass(messageType);
                     $('#chat-message-list').append(newMessage); 
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
                    let newMessage=$('<li>');  
                    let messageType='self-message';
                    newMessage.append($('<span>',{
                        'html':msg
                     }))
                     newMessage.addClass(messageType);
                     $('#chat-message-list').append(newMessage); 
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
        if(data.data.chatroom!==self.chatroom) return ;
      $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 1);


       let newMessage=$('<li>');
       let messageType='other-message';
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




//loader on rendering page //


var offLoader=(val)=>{
      if(val){
        
          $('.loading-Gif2').css({display:'none'});
          $('#chat-message-list').css({display:'block'});
          $("#chat-message-list").stop().animate({ scrollTop: $("#chat-message-list")[0].scrollHeight}, 1);
           $('.loading-Gif').css({display:'none'});
           $('#recent-chat-list').css({display:'flex'});

      }else{
        $('.loading-Gif').css({display:'none'});
        $('#recent-chat-list').css({display:'flex'});
         
      }        
}