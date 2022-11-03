
const User = require('../models/user')
const post =require('../models/post')
const Following=require('../models/following');
const following = require('../models/following');



module.exports.homeuser = async function(req ,res){
    
        
 try{
    let posts= await post.find({})
         .sort('-createdAt')
         .populate('user')
         .populate({
            path:'likes',
            populate:{
                path:'user'
            }
         })
         .populate({
                     path : 'comments',
                     options:{sort:'-createdAt'},
                     populate: {
                                  path : 'user'
                     }
                    })   

        let liked=[];
        let iterator=0
        for(let i=0;i<posts.length;i++){
            for(let b=0;b<posts[i].likes.length;b++){
                if(posts[i].likes[b].user.username==req.user.username){
                    liked[i]=true;
                }
            }

            if(!liked[i]){
                liked[i]=false;
            }
        }
           
        

 let user = await User.findById(req.user._id);
 let user_following= await Following.find({user:user._id}).populate("following");
 
 let usernames =[];
 let itr=0;
 for(user of user_following){
     usernames[itr++]=user.following.username;
 }


  let validUser=await User.find({"username": {$nin:usernames}}).sort('-createdAt');
  

    return res.render('user_home', {

      tittle: 'USER HOME',
      Post : posts,
      users: validUser,
      User_following:user_following,
      Liked:liked,
      i:iterator,  
      page:"home"
      })
 
}catch(err){
   
      console.log("ERROR IN FETCHING POST AND USER", err)
      return res.redirect('/')
}
};



module.exports.signin= function(req , res){
 
    if(req.isAuthenticated()){

        return  res.redirect('/user/user_home');

    }else{
        console.log("error in signin");
    }


    return res.render('signin',{

        type:false ,
        title : 'SIGN-IN'

    })
}
 

// to search user //

module.exports.users= async function(req,res){
    try{
          
        if(req.query.search==""){return res.status(201).json([])};

        const keyword =req.query.search
        ? {
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
                {username:{$regex:req.query.search,$options:"i"}}
            ],
         }:{};
       const users =await User.find(keyword).find({_id:{$ne:req.user._id } });
       return res.status(201).json({
          users:users
       });


    }catch(err){
       console.log("error in searching user", err);
    }
}



// to render explore section  //

module.exports.renderExplore= async (req,res)=>{
      
    try{
         
        let user= await User.findById(req.user.id).populate('following');
        
        let userFollowings=[];
        let iterator=0;
        for( let following of user.following){
            userFollowings[iterator++]=following.following;
            
        }
        userFollowings[iterator]=req.user.id;

  
       let posts =await post.find({"user":{$nin:userFollowings}})
       .sort('-createdAt')
         .populate('user')
         .populate({
            path:'likes',
            populate:{
                path:'user'
            }
         })
         .populate({
                     path : 'comments',
                      populate: {
                                  path : 'user'
                       },
                       populate:{
                          path:'likes',
                       populate :{
                            path:'user'
                        }
                       }
                    })   

                  
       
        return res.render('explore',{

           posts:posts,
           page:"explore"          
        });
    }catch(err){
        console.log("error in fetching posts in explore section",err);
    }
    
}
 




