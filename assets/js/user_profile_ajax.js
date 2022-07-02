{
      
//    to follow user using ajax

    // let followButton=$('.follow-button');

    $('.follow-button').click(function(e){

        e.preventDefault();



        $.ajax({
            type:'get',
            url:$('.follow-button').attr('href'),
            success:function(data){
                 
                 
                 let follow_button=$(`<button id="message-button">Message</button>
                 <a class="unfollowLink" href="/user/tofollow/following?id=${data.data.userId}"><button id="unfollow-">
                     <img src="../assets/images/unfollow-1.png" id="unfollow-logo1">
                     <img  src="../assets/images/unfollow-2.png" id="unfollow-logo2">
                 </button>
                 </a>`);
                 $('.follow-button').remove();
                 $('#followers_count').html(` <b>${data.data.following.length} </b>followers`);
                 $(follow_button).appendTo('#name') ;




            },
            error:function(err){
                 
                  console.log("error in to follow using ajax",err)
            }

        })

    })





  
    // to  unfollow user using ajax
   

    $('.unfollowLink').click(function(e){
        e.stopImmediatePropagation(); 

        $.ajax({
            type:'get',
            url:$('.unfollow-button').attr('href'),
            success:function(data){
                
                 let follow_button=removeElemets(data.data);
                 $(follow_button).appendTo('#name') ;

            },
            error:function(err){
                 
                  console.log("error in to unfollow using ajax",err)
            }
        })



        let removeElemets=function(data){
           
                $('#message-button').remove();
                $('.unfollow-button').remove();
  
                $('#followers_count').html(` <b>${data.following.length} </b>followers`);
          return $(` <a class="follow-button" style="text-decoration: none;" 
              href="/user/tofollow/following?id=${data.userId}" > <button  id="follow-">Follow</button></a>`);



        }
    })


    // profile picture updation //

    //to change existing profile picture //

 var updateProfile=function(avtar){

        $('body').addClass("stop-scroll");
         $('.profile-updation-container').css({
            width: '100%',
            height: '100vh',
            overflow: 'none',
            position:'fixed'
         })
    
         $('#nav').css({
            zIndex:'0'
         })
      
 
   let file=$('#selection-button');
        file.change(function(e){
            
             var path=URL.createObjectURL(e.target.files[0]);  
                let form =$('.picture-selection')

                 form[0].submit(function(event){

                    event.stopImmediatePropagation(); 
                       
                         $.ajax({
                            type:'post',
                            url:$(form).attr('action'),
                            success:function(data){
                                       
                                $('#user-picture').remove();
                                $(`<img onclick="updateProfile(true)" id="user-picture" src="${path}" alt="<%=user.name%>" width="200px" height="200px">`).appendTo('#box-1')
                            
                            },
                            error:function(err){
                                console.log("error in changing profile using ajax",err);
                            }
                         })

                 })
           
        })  
  }  


  // to put profile picture //

  let file=$('#selection-button2');
     file.change(function(e){
        var path=URL.createObjectURL(e.target.files[0]);            
        
         $('#form')[0].submit(function(e){
            
         })      
        //    form.remove();
        //    let newAvtar=$(`<img onclick="updateProfile(true)" id="user-picture" src="${path}" alt="<%=user.name%>" width="200px" height="200px">`)
       //    newAvtar.appendTo('#box-1')


  })
 
  // to remove existing profile pircture
  
    // to end the processs //
     var endProcess=function(){

         $('body').removeClass("stop-scroll") 

         $('.profile-updation-container').css({
            width: '0',
            height: '0',
            overflow: 'hidden'
         })
    
         $('#nav').css({
            zIndex:'99999'
         })

     }

  
}



