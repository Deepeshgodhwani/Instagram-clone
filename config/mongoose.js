const mongoose= require ('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db =mongoose.connection;

db.once('open', function(error){

     if(error){

        console.log("ERROR IN CONNECTING WITH DATABASE")
     }
     
    console.log("DATABASE CONNECTED SUCCESSFULY")
});
