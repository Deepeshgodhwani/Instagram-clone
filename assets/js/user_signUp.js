

{
    
    let signupForm=$('.outer');
    let emailVerifyPage=$('.enterOtp');
    
    // for creating user //
    $('#signup-form').submit(function(e){
        const submitBtn=$('#submitbutton');
        submitBtn.attr('disabled',true);
        let loading=$('.Loading')
        loading.css({display:"flex"});
        submitBtn.val('');
        e.preventDefault();
        let self=this;  
         $.ajax({
            type:'post',
            url:$(self).attr('action'),
            data:$('#signup-form').serialize(),  
            success:function(data){
                if(data.errorType=="password"){
                    loading.css({display:"none"});
                    submitBtn.val("Sign up");
                    submitBtn.attr('disabled',false);
                    $("#signup-form")[0].reset()
                    $('.errorBox').text('Password and Confirm Password does not match');
                }else if(data.errorType=="User"){
                    loading.css({display:"none"});
                    submitBtn.val("Sign up");
                    submitBtn.attr('disabled',false);
                    $("#signup-form")[0].reset()
                    $('.errorBox').text('Another account is using the same email address');
                }else if(data.errorType=="username"){
                    loading.css({display:"none"});
                    submitBtn.attr('disabled',false);
                    submitBtn.val("Sign up");
                    $("#signup-form")[0].reset()
                    $('.errorBox').text("This username isn't available. Please try another");
                }else if(data.errorType=="incorrect-email"){
                    loading.css({display:"none"});
                    submitBtn.val("Sign up");
                    submitBtn.attr('disabled',false);
                    $("#signup-form")[0].reset()
                    $('.errorBox').text('Invalid email address'); 
                }else{
                    submitBtn.val("Sign up");
                    loading.css({display:"none"});
                    submitBtn.attr('disabled',false);
                    signupForm.css({display:"none"}); 
                    $("#signup-form")[0].reset()
                    $("#confirm-para").text(`Enter the confirmation code we sent to ${data.userEmail}
                    This will expire in 10 minutes .`)
                    emailVerifyPage.css({display:"flex"}) 
                    //render enter your otp page
                }
            },
               error:function(error){     
              }

         })
    })


    //confirming email address //

    $("#otpForm").submit(function(e){
        
        let btn=$("#next");
        let loading =$('.Loading2');
        btn.val('');
        loading.css({display:"flex"});
      
        e.preventDefault();
        let self=this;  
         $.ajax({
            type:'post',
            url:$(self).attr('action'),
            data:$('#otpForm').serialize(), 
            success:function(data){
               let errorBox=$("#errorMessage");
                if(data.error=="otp_expired"){
                    btn.val("Next");
                    loading.css({display:"none"});
                    errorBox.text("Otp is expired")
                }else if(data.error=="invalid_otp"){
                    btn.val("Next");
                    loading.css({display:"none"});
                    errorBox.text("Invalid otp entered")
                }else{
                    btn.val("Next");
                    loading.css({display:"none"});
                    window.location.href =`/account/create-session?username=${data.user.username}&password=${data.user.password}`;
                }
            },error:function(err){
                console.log("error in creating user using ajax",err);
            }
         })
    })


    

}