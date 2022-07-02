const queue =require('../config/kue');
const commentMailer= require('../mailers/commentMailer'); 


queue.process('email', function(job, done){

  console.log('emails worker is processing a job',job.data)

   
    commentMailer.commentMailer(job.data);
   
     done();
 
    

})