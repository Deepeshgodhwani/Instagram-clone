const Following = require("../models/following");
const Followers = require("../models/followers");
const User = require("../models/user");

module.exports.following = async function (req, res) {
  try {
    isAlreadyFollowing = await Following.findOne({
      following: req.query.id,
      user: req.user._id,
    });

    if (isAlreadyFollowing) {
      //first deleted from the user1 following

      await Following.findByIdAndDelete(isAlreadyFollowing._id);
      let user1 = await User.findById(req.user._id);
      user1.following.pull(isAlreadyFollowing);
      user1.save();

      //then from followers of user 2

      let follower = await Followers.findOneAndDelete({
        followers: req.user._id,
        user: req.query.id,
      });

      let user2 = await User.findById(req.query.id);
      user2.followers.pull(follower);
      user2.save();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            type: "unfollowed",
          },
        });
      }

      return res.redirect("back");
    } else {
      // user2 whom user1 follow //
      let whomFollowing = await Following.create({
        following: req.query.id,
        user: req.user._id,
      });

      let user1 = await User.findById(req.user._id);

      user1.following.push(whomFollowing);
      user1.save();

      // following of user 1 is follower of user 2

      let follower = await Followers.create({
        followers: req.user._id,
        user: req.query.id,
      });
      let user2 = await User.findById(req.query.id);

      user2.followers.push(follower);
      user2.save();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            type: "followed",
          },
        });
      }
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error in following user", error);
  }
};

module.exports.userFollowers = async (req, res) => {
  try {
    let user = await User.findById(req.query.id).populate({
      path: "followers",
      populate: {
        path: "followers",
      },
    });

    res.send(user.followers);
  } catch (error) {
    console.log("error in fectching followers of user", error);
  }
};

module.exports.usersFollowing = async (req, res) => {
  try {
    let user = await User.findById(req.query.id).populate({
      path: "following",
      populate: {
        path: "following",
      },
    });

    res.send(user.following);
  } catch (err) {
    console.log("error in fetching followings of user", err);
  }
};
