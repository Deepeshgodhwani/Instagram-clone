

// toggling flash message  //

const toggleBar =()=>{
     $('#message').css({display:'none'});
}

const statusMessage =(message)=>{
   $('#message').text(message);
   $('#message').css({display:'flex'});
   setTimeout(toggleBar, 3000);
}






let toggleSection=(value)=>{
    let editProfileEl=document.getElementById('profile-form')
    let passwordResetEl=document.getElementById('passwordChangeSection')
    let heading1=document.getElementById('heading-1');
    let heading2=document.getElementById('heading-2');

    if(value){
         passwordResetEl.style.display="none";
         editProfileEl.style.display="flex";
         heading1.style.borderBottom="2px solid black";
         heading2.style.borderBottom="none";
    }else{
        passwordResetEl.style.display="flex";
         editProfileEl.style.display="none";
         heading1.style.borderBottom="none";
         heading2.style.borderBottom="2px solid black";
    }
}


$('#profile-form').submit(function(e){
    e.preventDefault();
    let self=this;

    $.ajax({
        type:"post",
        url:$(self).attr('action'),
        data:$(self).serialize(),
        success:function(data){
             if(data.error=="wrong password"){    
                  $('.password').val('');
                  statusMessage("Invalid password");
             }else if(data.error=="username already exist"){
                 $('#value-username').val('');
                  statusMessage("Username is already exist");
             }else{
                  $('#value-name').val(data.user.name);
                  $('#value-username').val(data.user.username);
                  $('#value-bio').val(" ");
                  $('#value-username').val(data.user.username);
                  $('.password').val('');
                  statusMessage("Profile saved");
             } 
        },
        error:function(err){
          
           statusMessage("Something went wrong. Please try again.");
        }
    })

})


$('.password-changing-form').submit(function(e){
     e.preventDefault();
     let oldPass=$('.oldPass');
     let newPass=$('.newPass');
     let confPass=$('.confPass');
     let self =this;
     $.ajax({
          type:'post',
          url:$(self).attr('action'),
          data:$(self).serialize(),
          success:function(data){
              if(data.error=="wrong password"){
                     oldPass.val('');
                     newPass.val('');
                     confPass.val('');
                    statusMessage("Old password is invalid");
              }else if(data.error=="same password"){
                    oldPass.val('');
                    newPass.val('');
                    confPass.val('');
                    statusMessage("Your new password is too similiar to your current password. Please try another password"); 
              }else if(data.error=="passandconf"){
                    oldPass.val('');
                    newPass.val('');
                    confPass.val('');
                    statusMessage("The password confirmation does not match");
              }else{
               oldPass.val('');
               newPass.val('');
               confPass.val('');
               statusMessage("Password changed");
              }

          },error:function(err){
             console.log("error in changing password using ajax at edit profile section",err);
          }
     })

})



// to close search bar 
$('.form-box').click(function(){
     $('.searchResult').css({display:"none"})
     $('#close').css({display:"none"});
     $('#logo').css({display:"flex"})
     $('.loading').css({display:'none'});
     $('.search').val('');
 })