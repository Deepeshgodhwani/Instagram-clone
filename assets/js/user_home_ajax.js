
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
                      
                      $.ajax({
                         
                         type:'Post',
                         url:$(self).attr('href'),
                         success:function(data){
                                      
                                let likesCount =parseInt($(self).attr('data-likes'));
                                 if(data.data.Deleted==true){
                                         
                                       likesCount -= 1;
                                 }else{
                                     
                                       likesCount += 1;
 
                                 }

                                 $(self).attr('data-likes',likesCount);
                                 $(`.${$(self).attr("postId")}`).text(`${likesCount} likes`); 
                         },
                         error:function(err){
                            console.log("error in sending like request through xhr",err)
                         }

                      })

              })
         }

  }


class DeletePost{

    constructor(postElement){
     
        this.posts=postElement;
        this.deletePost();
    }


    deletePost(){

        $(this.posts).click(function(e){
            let postUrl =this;
            console.log(postUrl);
            e.preventDefault();
               
            $.ajax({
                type:'get',
                url:$(postUrl).attr('href'),
                success:function(data){
                    
                    $(`.d-${data.data.post_id}`).remove();

                }, 
                error:function(err){
                    console.log("error in deleting post through ajax",err);
                }
            })
        })
    }
}  



var preloader= function(){

    $('#loading').css({
        width:'0',
        height:'0',
        overflow:'hidden',
        position:'absolute'
    })
}