const nodemailer = require('../config/nodemailer');


exports.verification = (data)=>{
   
   let response;
   let stringHtml= nodemailer.renderTemplate({data:data}, './email_verification.ejs')
      
 nodemailer.transporter.sendMail({
          
    from:'deepeshgodwani28@gmail.com',
    to:data.user.email,
    subject: 'EMAIL VERIFICATION',
    html:stringHtml

  },function(err,info){
      if(err){
         console.log("error in sending email");
         response= false;
           
      }else{
          console.log(info);

          response =true;
          
      }
         
     
   })  

   return response;
    
}


    