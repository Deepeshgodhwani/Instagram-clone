const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
