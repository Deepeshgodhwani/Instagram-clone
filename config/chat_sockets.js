const messageModel = require("../models/messagesModel");
const Chat = require("../models/chatModel");
const User = require("../models/user");

module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", function (socket) {
    console.log("connected to socket.io");

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("setup", function (data) {
      console.log(data.userId);
      socket.join(data.userId);
      console.log("user joined", data.name);
    });

    //detect send_message and broadcast to everyone in the room //

    socket.on("send_message", async function (data) {
      let message = await messageModel.create({
        sender: data.userId,
        content: data.message,
        chat: data.chatroom,
      });

      let chat = await Chat.findById(message.chat);
      chat.latestMessage = message._id;
      chat.save();

      if (chat.users[0].userId != data.userId) {
        var messageRecieverId = chat.users[0].userId;
      } else {
        var messageRecieverId = chat.users[1].userId;
      }

      let user = await User.findById(messageRecieverId);

      const details = {
        data: data,
        reciever: user,
      };

      chat.users.forEach((user) => {
        let userId = user.userId.toString();
        socket.in(userId).emit("receive_message", details);
      });
    });
  });
};
