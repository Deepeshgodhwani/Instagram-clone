const Chatroom =require('../models/chatModel');
const Users= require('../models/user');
const Messages=require('../models/messagesModel');
const chat = require('../models/chatModel');




//  rendering chatting section  //

module.exports.messagesSection= async function(req,res){

    try{


        if(req.query.id){
          let ischat= await Chatroom.findOne({
               $and:[
                      {users: {$elemMatch: {userId:req.user._id}}},
                      { users:{$elemMatch:{userId:req.query.id}}}
                    ]
              })

           if(ischat){

              var messages=await Messages.find({chat:ischat._id}).populate('sender');

              
           }else{
               var newChat= await Chatroom.create({
                  users:[
                     {
                       userId:req.user._id,
                     },
                     {
                       userId:req.query.id
                     }
                  ],
                  latestMessage:null

              })
               
               var messages= [];  
           }
        
          
          var chatroom;
          if(newChat){
              chatroom=newChat
          }else{
            chatroom=ischat;
            
          }
             
          var user2 =  await Users.findById(req.query.id);
   
       }
              
       
       
  let chats= await Chatroom.find({users:{$elemMatch:{userId:req.user._id}}})
                   .populate('users.userId').populate('latestMessage').sort('-updatedAt'); 
        

       return res.render('chattingSection' ,{
           Chatroom:chatroom,
           User2:user2,
           Messages:messages,
           recentChats:chats,
           page:"chatting"
       });

    }catch(err){

        console.log("error in chat controller", err)

    }

    
}