{
      

    
//    to follow user using ajax

   var toggleFollow=function(){
        $.ajax({
            type:'get',
            url:$('.follow-button').attr('link'),
            success:function(data){
                let box1=$('.unFollowBox');
                let box2=$('.followBox');
                 if(box1.length){
                    box1.empty();
                    let count =parseInt(box1.attr('followers'));
                     count +=1;
                     let div=$('#followers_count');
                     $('b',div).text(count);
                    let userId=box1.attr('profileId');
                    box1.append(`<div class="bundle">
                    <a href="/user/direct/inbox?id=${userId}"><button id="message-button">Message</button></a>
                     <div onclick="toggleUnfollow()" class="unfollowLink" link="/user/tofollow/following?id=${userId}"><button id="unfollow-">
                        <img src="../assets/images/unfollow-1.png" id="unfollow-logo1">
                        <img  src="../assets/images/unfollow-2.png" id="unfollow-logo2">
                    </button>
                    </div>
                    </div>`)
                    box1.attr('followers',count);

                }else{
                    box2.empty();
                    let count =parseInt(box2.attr('followers'));
                    count +=1;
                     let div=$('#followers_count');
                     $('b',div).text(count);
                    let userId=box2.attr('profileId');
                    box2.append(`<div class="bundle">
                    <a href="/user/direct/inbox?id=${userId}"><button id="message-button">Message</button></a>
                     <div onclick="toggleUnfollow()" class="unfollowLink" link="/user/tofollow/following?id=${userId}"><button id="unfollow-">
                        <img src="../assets/images/unfollow-1.png" id="unfollow-logo1">
                        <img  src="../assets/images/unfollow-2.png" id="unfollow-logo2">
                    </button>
                    </div>
                    </div>`)
                    box2.attr('followers',count);

                }
            },
            error:function(err){
                 
                  console.log("error in to follow using ajax",err)
            }

        })

    }





  
    // to  unfollow user using ajax
   

    var toggleUnfollow=function(){
       let self =$('.unfollowLink');
        $.ajax({
            type:'get',
            url:self.attr('link'),
            success:function(data){
                let box1=$('.unFollowBox');
                let box2=$('.followBox');
                if(box1.length){
                   box1.empty();
                   let count =parseInt(box1.attr('followers'));
                   count -=1;
                    let div=$('#followers_count');
                    $('b',div).text(count);
                   let userId=box1.attr('profileId');
                   box1.append(`<div class="bundle">
                   <div onclick="toggleFollow()" class="follow-button" style="text-decoration: none;" link="/user/tofollow/following?id=${userId}" > <button  id="follow-">Follow</button></div>
               </div>`)
               box1.attr('followers',count);


                }else{
                   box2.empty();
                   let count =parseInt(box2.attr('followers'));
                   count -=1;
                    let div=$('#followers_count');
                    $('b',div).text(count);
                   let userId=box2.attr('profileId');
                   box2.append(`<div class="bundle">
                   <div onclick="toggleFollow()" class="follow-button" style="text-decoration: none;" link="/user/tofollow/following?id=${userId}" > <button  id="follow-">Follow</button></div>
               </div>`)
                 box2.attr('followers',count);

                }
            },
          
        })



    }


    // profile picture updation //

    //to change existing profile picture //

 var updateProfile=function(avtar){

        // $('body').addClass("stop-scroll");
        $('.outer-box').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
        $('.profile-updation-container').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
         $('.profile-updation-container').css({
            width: '100%',
            height: '100vh',
            // overflow: 'none',
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

        $('.outer-box').off('scroll touchmove mousewheel');
        $('.profile-updation-container').off('scroll touchmove mousewheel');

         $('.profile-updation-container').css({
            width: '0',
            height: '0',
            overflow: 'hidden'
         })
    
         $('#nav').css({
            zIndex:'99999'
         })

     }
  


//   toggle followers or following list   //

const loading=(val)=>{
     
    if(val){
        $('.Loading').css({display:"flex"});
    }else{
        $('.Loading').css({display:"none"});
    }

}

     var openList=(type,id)=>{
        
        let parantDiv=$('.search-Result');
        $('.outer-box').css({height:"100vh"})
        $('.outer-box').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
        parantDiv.empty();
        parantDiv.append("<img style='position: relative;  width: 20px; z-index: 10000;' class='Loading' src='../assets/images/loading.gif'/>")
                
        loading(true);
       
        if(type=="followers"){
            $('#Heading').text("Followers");
             $('.outerLayer').css({display:"flex"}); 
             $('.outerLayer').on('scroll touchmove mousewheel', function(e){
                e.preventDefault();
                e.stopPropagation();
                return false;
              })
            $.ajax({
                type:"get",
                url:`/user/tofollow/followers?id=${id}`,
                success:function(data){
                    loading(false);
                    parantDiv.append(data.map(function(element){
                        return  `<div class="users-detail">
                        <a href="/user/profile/${element.followers._id}">
                            <img id="user-avatar" src="${element.followers.avtar}"/>  
                        </a>
                        <a id="user-name2" href="/user/profile/${element.followers._id}">
                            <p id="username">
                            ${element.followers.username}
                            </p>
                            <p id="Name">
                            ${element.followers.name}
                            </p>
                        </a>
                    </div>`
                    }))
                },
                error:function(error){
                    console.log("error in fetching users followers using ajax",error);
                }
            })
        }else{
            $('#Heading').text("Following");
            $('.outerLayer').css({display:"flex"});  
              
            $.ajax({
                type:"get",
                url:`/user/tofollow/userFollowings?id=${id}`,
                success:function(data){
                  loading(false);
                    parantDiv.append(data.map(function(element){
                        return  `<div class="users-detail">
                        <a href="/user/profile/${element.following._id}">
                            <img id="user-avatar" src="${element.following.avtar}"/>  
                        </a>
                        <a id="user-name2" href="/user/profile/${element.following._id}">
                            <p id="username">
                            ${element.following.username}
                            </p>
                            <p id="Name">
                            ${element.following.name}
                            </p>
                        </a>
                    </div>`
                    }))
                },
                error:function(error){
                    console.log("error in fetching users followers using ajax",error);
                }
            })
        }
     }


      

}

function closed(){
   $('.outerLayer').css({display:"none"});  
   $('.outer-box').css({height:"auto"})
   $('.outerLayer').off('scroll touchmove mousewheel');
   $('.outer-box').off('scroll touchmove mousewheel');

                   
  }



  // to close search bar 
$('.outer-box').click(function(){
    $('.searchResult').css({display:"none"})
    $('#close').css({display:"none"});
    $('#logo').css({display:"flex"})
    $('.loading').css({display:'none'});
    $('.search').val('');

})
