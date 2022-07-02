const nodemailer = require('../config/nodemailer');


exports.commentMailer = (comment)=>{
 
   let stringHtml= nodemailer.renderTemplate({comment:comment}, './comments/new_comment.ejs')
      
 nodemailer.transporter.sendMail({
          
    from:'deepeshgodwani28@gmail.com',
    to: comment.user.email,
    subject: 'COMMENT PUBLISHED !!',
    html:stringHtml

  },function(err,info){
      if(err){
         
        console.log("error in sending mail",err)
        return;
      }
         
     // console.log("message sent" ,info);
   })  
    
}


    