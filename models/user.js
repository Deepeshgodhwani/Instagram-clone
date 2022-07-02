const mongoose = require('mongoose')
const multer =require('multer');
const path = require('path');
const uploads = path.join('/uploads/user/avtar');

const userShema= new mongoose.Schema({

       email: {
          
            type : String,
            required : true,
            unique : true

       },
       password:{

          type: String,
          required :true,


       },username:{
            type :String,
            required:true,
            unique:true
       },
       name: {  
           type : String,
           require : true
       },
       bio:{
             type:String
       },
       avtar : {
           type : String
       },
       posts:[
         {
           type:mongoose.Schema.Types.ObjectId,
           ref:'post'
         }
       ],
       following :[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:'following'
        }
      ],
      followers :[
       {
         type:mongoose.Schema.Types.ObjectId,
         ref:'followers'
       }
     ]


}, {
    timestamps : true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',uploads))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  // static methods
  userShema.statics.uploadedAvtar= multer({storage: storage}).single('avtar');
  userShema.statics.avtarPath=uploads   
const user = mongoose.model("user", userShema)

module.exports= user;