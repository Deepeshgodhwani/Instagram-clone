const mongoose= require ('mongoose');
mongoose.connect("mongodb://localhost/SOCIAL-MEDIA-APP_db");
const db =mongoose.connection;

db.once('open', function(error){

     if(error){

        console.log("ERROR IN CONNECTING WITH DATABASE")
     }
     
    console.log("DATABASE CONNECTED SUCCESSFULY")
});
