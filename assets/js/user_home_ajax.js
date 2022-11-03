


// toggling flash message  //

const toggleBar =()=>{
    $('#message').css({display:'none'});
}

const statusMessage =(message)=>{
  $('#message').text(message);
  $('#message').css({display:'flex'});
  setTimeout(toggleBar, 2000);
}



 // preloader 

var preloader= function(){

    $('#loading').css({
        width:'0',
        height:'0',
        overflow:'hidden',
        position:'absolute'
    })
}



// toggle follow unfollow user //

class FollowUnfollow{
    constructor(element){
        this.btn=element;
        this.onToggle();
    }

    onToggle(){
        $(this.btn).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                         
                type:'get',
                url:$(self).attr('href'),
                success:function(data){
                    if(data.data.type=="followed"){
                        $(self).css({color:'black'})
                        $(self).text("Following");
                    }else{
                        $(self).text("Follow");
                        $(self).css({color:'rgb(0,149,246)'})

                    }
                 },
                error:function(err){
                    console.log("error in following user through home.js",err);
                }  
            })
             
        })
    }
}
 
//  toggle likes on post //

  class ToggleLike{
         
         constructor(toggleElement){
            this.toggler =toggleElement;
            this.toggleLike();
              
        } 
      
// ajax request for toggle like 
         toggleLike(){
                
              $(this.toggler).click(function(e){

                                            
                      e.preventDefault();
                      let self =this;
                      let liked =$('#red',self);
                      let unliked=$('#white',self);
                      
                      $.ajax({
                         
                         type:'get',
                         url:$(self).attr('href'),
                         success:function(data){
                                      
                                let likesCount =parseInt($(self).attr('data-likes'));
                                 if(data.data.Deleted==true){
                                       likesCount -= 1; 
                                       liked.removeClass("fa-solid fa-heart");
                                       liked.addClass("fa-regular fa-heart");
                                       $('div', self).removeClass("animate__animated animate__pulse");
                                       unliked.removeClass("fa-solid fa-heart");
                                       unliked.addClass("fa-regular fa-heart");
                                       unliked.css({color:"black"});
                                       liked.css({color:"black"});              
                            
                                 }else{
                                     
                                       likesCount += 1;
                                        
                                       $('div', self).addClass("animate__animated animate__pulse");
                                       unliked.removeClass("fa-regular fa-heart");
                                       unliked.addClass("fa-solid fa-heart") ;
                                       liked.removeClass("fa-regular fa-heart");
                                       liked.addClass("fa-solid fa-heart");
                                       unliked.css({color:"rgb(237, 73, 86)"});
                                       liked.css({color:"rgb(237, 73, 86)"});
                                 }

                                 $(self).attr('data-likes',likesCount);
                                 let likescountpara=$(`.${$(self).attr("postId")}`);
                                 if(likesCount==0){
                                    likescountpara.remove();
                                 } 
                                 if(likescountpara.length){
                                     likescountpara.text(`${likesCount} likes`); 
                                 }else{
                                    $(`.head${$(self).attr("postId")}`).prepend(`<div class=${$(self).attr("postId")} id="total-likes">
                                      ${likesCount} likes
                                </div>`)
                                 }
                         },
                         error:function(err){
                            console.log("error in sending like request through xhr",err)
                         }

                      })

              })
         }

  }


//   deleting post using ajax //

class DeletePost{

    constructor(postElement){
     
        this.posts=postElement;
        this.deletePost();
    }


    deletePost(){

        $(this.posts).click(function(e){
            let postUrl =this;
            e.preventDefault();
               
            $.ajax({
                type:'get',
                url:$(postUrl).attr('href'),
                success:function(data){
                    
                    $(`.d-${data.data.post_id}`).remove();
                    statusMessage("Post deletd");

                }, 
                error:function(err){
                    console.log("error in deleting post through ajax",err);
                }
            })
        })
    }
}  


// to close search bar 
$('#container').click(function(){
    $('.searchResult').css({display:"none"})
    $('#close').css({display:"none"});
    $('#logo').css({display:"flex"})
    $('.loading').css({display:'none'});
    $('.search').val('');

})


//posting comment using ajax //


$('.comment-form').submit(function(e){
    e.preventDefault();
    let self=this;
    $.ajax({
        type:'post',
        url:$(self).attr('action'),
        data:$(self).serialize(),
        success:function(data){
             let outer=$(`.Comment${data.comment.post}`);
             let countBox=$(`.count${data.comment.post}`);
             let count=parseInt(countBox.attr('commentCount'));
            //  count= countBox.length==0?0:count;
             count=count+1
             console.log(count);
             outer.empty();
             if(count>=2){
                outer.append(`
                <a class="count${data.comment.post}" commentCount=${count} style="text-decoration:none ;" href="/user/post/postView/${data.comment.post}"> 
                   <div  id="total-comments">
                     view all ${count} comments
                    </div>
                  </a>`)
             }else{
                console.log("hey")
                outer.append(`<div class="count${data.comment.post}" commentCount=${count}> 
                </div>`)
             }
             
             outer.append(`<div  id="commentBox" > 
             <p class="Username">
                ${data.comment.user.username}
             </p>
             <p class="Content">
               ${data.comment.content.slice(0,30)}.. 
             </p>
           </div>`)
           $(`.Input${data.comment.post}`).val('');
           statusMessage("Comment Posted")
        }
    })
})


var doComment=(Id)=>{
      $(`.${Id}`).focus();
}


















