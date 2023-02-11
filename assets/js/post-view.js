

// toggling flash message  //

const toggleBar =()=>{
   $('#message').css({display:'none'});
}

const statusMessage =(message)=>{
 $('#message').text(message);
 $('#message').css({display:'flex'});
 setTimeout(toggleBar, 2000);
}



   //   toggle comments likes using ajax  //
           
         var toggleLike=function(Id){
                 
                 let self=$(`.${Id}`);
                 let liked =$('#red',self);
                 let unliked=$('#white',self);
              
                 $.ajax({
                    
                    type:'get',
                    url:$(self).attr('link'),
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
                            $(`.${$(self).attr('commentId')}`).text(`${likesCount} likes`); 
                    },
                    error:function(err){
                       statusMessage("Something went wrong. Please try again.");
                    }

                 })

         }


//  toggle posts like using ajax //

$('.toggle-like-post').click(function(e){
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
              $('#likedd').text(`${likesCount} likes`); 
      },
      error:function(err){
         statusMessage("Something went wrong. Please try again.");
      }

   })

})

 
//  posting comment using ajax  //

$('.comment-forms').submit(function(e){
   e.preventDefault();
   
  let self=this;
   $.ajax({
      type:"post",
      url:$(self).attr('action'),
      data:$(self).serialize(),
      success:function(data){
         $('#content').val('');
          $(`<li class='comment${data.comment._id}' id="comments-list">
          <div class="box" >
              <img class="dp" src="${data.comment.user.avtar}">
            <div id="comment"> 
              <p style="font-weight: 600;">
                ${data.comment.user.username}
              </p>
              &nbsp;    
              ${data.comment.content}
              <div id="like-delete"> 
               <p style="font-size: 0.8rem;" class="${data.comment._id}">${data.comment.likes.length} likes</p> 
              ${ data.userId==data.comment.user._id?`<div style="cursor:pointer; font-size: 0.8rem;" class="delete${data.comment._id}" onclick="toggleDelete('delete${data.comment._id}')" commentId=${data.comment._id}  link="/user/comment/delete/${data.comment._id}">Delete</div>`:'<div> </div>'}
             </div>
            </div>
          </div>
           <div style="cursor:pointer;" class="btn${data.comment._id}" onclick=toggleLike('btn${data.comment._id}') commentId="${data.comment._id}" data-likes="${data.comment.likes.length}"  link="/user/liked/toggle?id=${data.comment._id}&type=Comment">
               <div id="unlike">      
                  <i id="white" class="fa-regular fa-heart"></i>
               </div>   
           </div> 
        </li>`).insertAfter(".caption")

        statusMessage('Comment Published');

      },
      error:function(err){
         statusMessage("Something went wrong. Please try again.");
      }
   })
})


//deleting comment using ajax //

var toggleDelete=function(Id){
  
   let self=$(`.${Id}`);
   $.ajax({
      type:'get',
      url:$(self).attr('link'),
      success:function(data){
            $(`.comment${data.commentId}`).remove();
            statusMessage("Comment deleted")
      },
      error:function(err){
         statusMessage("Something went wrong. Please try again.");
      }
   })
}


$('#commentBtn').click(function(){
   $('#content').focus();
})



  // to close search bar 
  $('.post-section').click(function(){
   $('.searchResult').css({display:"none"})
   $('#close').css({display:"none"});
   $('#logo').css({display:"flex"})
   $('.loading-bar').css({display:'none'});
   $('.search').val('');

})




