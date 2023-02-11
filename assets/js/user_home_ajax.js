// toggling flash message  //

const toggleBar = () => {
  $("#message").css({ display: "none" });
};

const statusMessage = (message) => {
  $("#message").text(message);
  $("#message").css({ display: "flex" });
  setTimeout(toggleBar, 2000);
};

// preloader

var preloader = function () {
  $("#loading").css({
    width: "0",
    height: "0",
    overflow: "hidden",
    position: "absolute",
  });
};

// toggle follow unfollow user //

class FollowUnfollow {
  constructor(element) {
    this.btn = element;
    this.onToggle();
  }

  onToggle() {
    $(this.btn).click(function (e) {
      e.preventDefault();
      let self = this;
      $.ajax({
        type: "get",
        url: $(self).attr("href"),
        success: function (data) {
          if (data.data.type == "followed") {
            $(self).css({ color: "black" });
            $(self).text("Following");
          } else {
            $(self).text("Follow");
            $(self).css({ color: "rgb(0,149,246)" });
          }
        },
        error: function (err) {
          statusMessage("Something went wrong. Please try again.");
        },
      });
    });
  }
}

//  toggle likes on post //

class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  // ajax request for toggle like
  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;
      let liked = $("#red", self);
      let unliked = $("#white", self);

      $.ajax({
        type: "get",
        url: $(self).attr("href"),
        success: function (data) {
          let likesCount = parseInt($(self).attr("data-likes"));
          if (data.data.Deleted == true) {
            likesCount -= 1;
            liked.removeClass("fa-solid fa-heart");
            liked.addClass("fa-regular fa-heart");
            $("div", self).removeClass("animate__animated animate__pulse");
            unliked.removeClass("fa-solid fa-heart");
            unliked.addClass("fa-regular fa-heart");
            unliked.css({ color: "black" });
            liked.css({ color: "black" });
          } else {
            likesCount += 1;

            $("div", self).addClass("animate__animated animate__pulse");
            unliked.removeClass("fa-regular fa-heart");
            unliked.addClass("fa-solid fa-heart");
            liked.removeClass("fa-regular fa-heart");
            liked.addClass("fa-solid fa-heart");
            unliked.css({ color: "rgb(237, 73, 86)" });
            liked.css({ color: "rgb(237, 73, 86)" });
          }

          $(self).attr("data-likes", likesCount);
          let likescountpara = $(`.${$(self).attr("postId")}`);
          if (likesCount == 0) {
            likescountpara.remove();
          }
          if (likescountpara.length) {
            likescountpara.text(`${likesCount} likes`);
          } else {
            $(`.head${$(self).attr("postId")}`).prepend(`<div class=${$(
              self
            ).attr("postId")} id="total-likes">
                                      ${likesCount} likes
                                </div>`);
          }
        },
        error: function (err) {
          statusMessage("Something went wrong. Please try again.");
        },
      });
    });
  }
}

//   deleting post using ajax //

class DeletePost {
  constructor(postElement) {
    this.posts = postElement;
    this.deletePost();
  }

  deletePost() {
    $(this.posts).click(function (e) {
      let postUrl = this;
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(postUrl).attr("href"),
        success: function (data) {
          $(`.d-${data.data.post_id}`).remove();
          statusMessage("Post deletd");
        },
        error: function (err) {
          console.log("error in deleting post through ajax", err);
          statusMessage("Something went wrong. Please try again.");
        },
      });
    });
  }
}

// to close search bar
$("#container").click(function () {
  $(".searchResult").css({ display: "none" });
  $("#close").css({ display: "none" });
  $("#logo").css({ display: "flex" });
  $(".loading-bar").css({ display: "none" });
  $(".search").val("");
});

//posting comment using ajax //

$(".comment-form").submit(function (e) {
  e.preventDefault();
  let self = this;
  $.ajax({
    type: "post",
    url: $(self).attr("action"),
    data: $(self).serialize(),
    success: function (data) {
      let outer = $(`.Comment${data.comment.post}`);
      let countBox = $(`.count${data.comment.post}`);
      let count = parseInt(countBox.attr("commentCount"));
      //  count= countBox.length==0?0:count;
      count = count + 1;
      console.log(count);
      outer.empty();
      if (count >= 2) {
        outer.append(`
                <a class="count${data.comment.post}" commentCount=${count} style="text-decoration:none ;" href="/user/post/postView/${data.comment.post}"> 
                   <div  id="total-comments">
                     view all ${count} comments
                    </div>
                  </a>`);
      } else {
        console.log("hey");
        outer.append(`<div class="count${data.comment.post}" commentCount=${count}> 
                </div>`);
      }

      outer.append(`<div  id="commentBox" > 
             <p class="Username">
                ${data.comment.user.username}
             </p>
             <p class="Content">
               ${data.comment.content.slice(0, 30)}.. 
             </p>
           </div>`);
      $(`.Input${data.comment.post}`).val("");
      statusMessage("Comment Posted");
    },
    error: (err) => {
      statusMessage("Something went wrong. Please try again.");
    },
  });
});

var doComment = (Id) => {
  $(`.${Id}`).focus();
};

// js for stories ///

const allStories = [
  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676100101/Instagram-clone/michelMusso.dp_rsiknz.jpg",
    username: "mitchelmusso",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676100102/Instagram-clone/michelMusso_fzbc5r.jpg",
    title: "Title No. 1",
  },

  {
    thumbUrl:"https://res.cloudinary.com/dynjwlpl3/image/upload/v1676099296/Instagram-clone/andrieu_zulfpy.jpg",
    imageUrl:"https://res.cloudinary.com/dynjwlpl3/image/upload/v1676099744/Instagram-clone/andriuStory_riwhuf.jpg",
    title: "Title No. 2",
    username: "andreideiu_",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1675965596/Instagram-clone/postMalone_udsqy9.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1675965771/Instagram-clone/story_xude5r.jpg",
    title: "Title No. 3",
    username: "postmalone",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1675964949/Instagram-clone/carryminati_lc5z6b.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1675966347/Instagram-clone/carryminati-story_p73xxs.jpg",
    title: "Title No. 4",
    username: "carryminati",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676100784/Instagram-clone/jackmorris_dp_fol4by.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676100782/Instagram-clone/jackmorris_story_ab19dm.jpg",
    title: "Title No. 5",
    username: "jackmorris",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101109/Instagram-clone/harrymackdp_odstwy.png",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101115/Instagram-clone/harryMackStory_shr5e6.jpg",
    title: "Title No. 6",
    username: "harrymack",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101410/Instagram-clone/hardwelldp_rxdy9j.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101407/Instagram-clone/hardwellstory_ddu2yx.jpg",
    title: "Title No. 7",
    username: "hardwell",
  },

  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101764/Instagram-clone/johnDavid_dp_arv8v9.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676101768/Instagram-clone/johnDavidStory_ltxbka.jpg",
    title: "Title No. 8",
    username: "johndavid",
  },
  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676102114/Instagram-clone/jenaissante_dp_hwhrcx.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676102118/Instagram-clone/jenaissante_story_y2tn9v.jpg",
    title: "Title No. 9",
    username: "jenaissante",
  },
  {
    thumbUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676102746/Instagram-clone/brunomarsdp_ydkeem.jpg",
    imageUrl:
      "https://res.cloudinary.com/dynjwlpl3/image/upload/v1676102864/Instagram-clone/brunomars_story_fyrwst.jpg",
    title: "Title No. 10",
    username: "brunomars",
  },
];

const storiesContainer = document.querySelector(".stories-container");
const storyFull = document.querySelector(".story-full");
const storyFullImage = document.querySelector(".story-full img");
const storyFullTitle = document.querySelector(".story-full .title");
const closeBtn = document.querySelector(".story-full .close-btn");
const leftArrow = document.querySelector(".story-full .left-arrow");
const rightArrow = document.querySelector(".story-full .right-arrow");
const ProfilePic = document.querySelector(".story-full .profileGroup .dp");
const username = document.getElementById("uName");
const blackground = document.getElementById("bg");
const rightScroll = document.getElementById("right");
const leftScroll = document.getElementById("left");

let currentIndex = 0;
let timer;

allStories.forEach((s, i) => {
  const story = document.createElement("div");
  story.classList.add("story");
  const content = document.createElement("div");
  const uName = document.createElement("p");
  content.classList.add("content");
  uName.innerHTML = s.username;

  const img = document.createElement("img");
  img.setAttribute("src", s.thumbUrl);

  content.appendChild(img);
  story.appendChild(content);
  story.appendChild(uName);
  storiesContainer.appendChild(story);

  content.addEventListener("click", () => {
    currentIndex = i;
    storyFull.classList.add("active");
    storyFullImage.setAttribute("src", s.imageUrl);
    ProfilePic.setAttribute("src", s.thumbUrl);
    username.innerHTML = s.username;
    clearInterval(timer);
    timer = setInterval(nextStory, 3000);
  });
});

leftScroll.addEventListener("click", () => {
  storiesContainer.scrollLeft -= 200;
});

rightScroll.addEventListener("click", () => {
  storiesContainer.scrollLeft += 200;
});

closeBtn.addEventListener("click", () => {
  storyFull.classList.remove("active");
});

bg.addEventListener("click", () => {
  storyFull.classList.remove("active");
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;

    storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);
    ProfilePic.setAttribute("src", allStories[currentIndex].thumbUrl);
    username.innerHTML = allStories[currentIndex].username;

    clearInterval(timer);
    timer = setInterval(nextStory, 3000);
  }
});

const nextStory = () => {
  if (currentIndex < allStories.length - 1) {
    currentIndex += 1;

    storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);
    ProfilePic.setAttribute("src", allStories[currentIndex].thumbUrl);
    username.innerHTML = allStories[currentIndex].username;
  }
};

rightArrow.addEventListener("click", () => {
  nextStory();
  clearInterval(timer);
  timer = setInterval(nextStory, 3000);
});
