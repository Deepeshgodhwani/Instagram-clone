const mongoose= require('mongoose');
const Multer =require('multer');
const path = require('path');
const postpath=path.join('/uploads/user/post')
const postSchema = mongoose.Schema({

    content: {

        type : String,
        require: true
    },
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require:true
    },caption:{
          
            type:String,
    },
    comments:[

        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'likes'
        }
    ] 
},{
    timestamps : true
})

const storage =Multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
      cb(null,path.join(__dirname,'..',postpath))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  
 postSchema.statics.uploadedPost = Multer({ storage: storage }).single('content');
 postSchema.statics.path=postpath;

const post= mongoose.model('post', postSchema);


module.exports= post;