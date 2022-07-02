{
  
   let commentForm= $('#comments');
   commentForm.submit(function(e){
     e.preventDefault();

    $.ajax({

       type: 'post',
       url:'comment/create',
       data: commentForm.serialize(),
       success: function(data){
            
            console.log(data);
            let commentData = addComment(data.data.comment);
            $(`#comment-${data.data.postId}>ul`).prepend(commentData);
            dComments($('#commentDelete',commentData));
            
       },
       error: function(err){

        console.log("error in comment posting",err.responseText);
       }
    })

   });


   let addComment=function(comment){

     console.log("reached");
       return $(`<li id="comment-${comment._id}"> 
        <small>
            <a id="commentDelete" href="comment/delete/ ${comment._id}"> X</a>
       </small>  ${comment.content} <br>
       <box style="font-size: 1rem;"> ${comment.user.name}</box>
    </li>`)
   }



   //method to delete comments//
 
   let dComments=function(dd){

    $(dd).click(function(e){
      e.preventDefault();
      console.log("hollaaaaa!!"); 
      $.ajax({
     
        type: 'get',
        url:$(dd).prop('href'),
        success:function(data){
             console.log(data.data.comment);
             $(`#comment-${data.data.comment.id}`).remove();
        },error: function(err){

            console.log(err.responseText);
        }
         
     })

   })
}
  

}