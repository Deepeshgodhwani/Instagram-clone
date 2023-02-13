const userPost = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Likes = require("../models/likes");
const fs = require("fs");
const path = require("path");

// rendering post section
module.exports.postSection = function (req, res) {
  return res.render("postsection", {
    page: "postView",
  });
};

module.exports.userPosts = function (req, res) {
  userPost.uploadedPost(req, res, function (err) {
    if (err) {
      console.log("error in postcontroller", err);
    } else {
      userPost.create(
        {
          content: userPost.path + "/" + req.file.filename,
          user: req.user._id,
          caption: req.body.caption,
        },
        function (err, post) {
          if (err) {
            console.log("error in creating post", err);
          }

          User.findById(post.user, function (err, user) {
            if (err) {
              console.log("error in finding user in creating post ", err);
            }

            user.posts.push(post);
            user.save();
          });
          return res.redirect("/user/user_home");
        }
      );
    }
  });
};

module.exports.deletePost = async function (req, res) {
  try {
    let post = await userPost.findById(req.params.id);

    if (post.user == req.user.id) {
      fs.unlinkSync(path.join(__dirname, "..", post.content));
      await Likes.deleteMany({ likeable: post, onmodel: "Post" });
      await Likes.deleteMany({ _id: { $in: post.comments } });
      User.findById(post.user, function (err, user) {
        if (err) {
          console.log("error in finding user to delete post");
        }

        user.posts.pull(post);
        user.save();
      });

      post.remove();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "POST DELETED !!",
        });
      }
      await Comment.deleteMany({ post: req.params.id });

      return res.redirect(`/user/profile/${req.user.id}`);
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("ERROR IN DELETING POST", err);
  }
};

// to render post view section //

module.exports.postview = async function (req, res) {
  try {
    let post = await userPost
      .findById(req.params.id)
      .populate("user")
      .populate({
        path: "comments",
        options: { sort: "-createdAt" },
        populate: [
          {
            path: "user",
            model: "user",
          },
          {
            path: "likes",
            model: "likes",
          },
        ],
      })
      .populate("likes");

    let comntliked = [];
    let iterator = 0;

    for (let i = 0; i < post.comments.length; i++) {
      for (let j = 0; j < post.comments[i].likes.length; j++) {
        if (post.comments[i].likes[j].user == req.user.id) {
          comntliked[i] = true;
        }
      }
      if (!comntliked[i]) {
        comntliked[i] = false;
      }
    }

    let liked = false;
    for (let i = 0; i < post.likes.length; i++) {
      if (req.user.id == post.likes[i].user) {
        liked = true;
      }
    }
    let eligible = false;

    req.user.id == post.user.id ? (eligible = true) : (eligible = false);
    
    if (req.xhr) {
      return res.status(201).json({
        post: post,
        itr: iterator,
        comntliked: comntliked,
        liked: liked,
      });
    }

    return res.render("post-view", {
      posts: post,
      itr: iterator,
      comntliked: comntliked,
      liked: liked,
      eligible: eligible,
      page: "postView",
    });
  } catch (err) {
    console.log("error in rendering post view section", err);
  }
};
