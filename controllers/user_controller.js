
const User = require('../modules/user')


module.exports.homeuser =function(req ,res){
    
    return res.render('user_home', {

        tittle: 'USER HOME'
    })

    

};

module.exports.profile =function(req ,res){
    
    return res.render('userprofile', {

        // content : 'header'

    })

    

};


module.exports.signin= function(req , res){

    
    if(req.isAuthenticated()){
          
        return  res.redirect('/user/profile')
   }


    return res.render('user_signin',{

        title : 'SIGN-IN'

    })
}
 


module.exports.signup= function(req , res){
       
        if(req.isAuthenticated()){
          
             return res.redirect('/user/profile')
        }
    
        
        return res.render('user_signup',{
    
           title : 'SIGN-up'

        })
}



module.exports.create= function(req , res){

    if(req.body.password !=req.body.confirm_password)
    {
            return  res.redirect('back')

    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err)
        {
           console.log("error in finding user")
           return;      
        } 
        
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating user");
                    return ; 
                   }
                 
                return res.redirect('/user/signin');   

            })
        }else{

            return  res.redirect('back');
            
        }


    })

};



module.exports.createSession= function(req , res){

    return  res.redirect('user_home');
};


module.exports.destroySession= function(req, res){

    req.logout();
    return res.redirect('/')
}
