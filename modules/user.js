const mongoose = require('mongoose')
const userShema= new mongoose.Schema({

       email: {
          
            type : String,
            required : true,
            unique : true

       },
       password:{

          type: String,
          required :true,


       },
       name: {
           type : String,
           require : true
       }

}, {
    timestamps : true
});


const user = mongoose.model("user", userShema)

module.exports= user;