
const User = require('../modules/user')

module.exports.profile =function(req ,res){
    
    return res.render('home', {

        tittle: 'USER'
    })

    

};


module.exports.signin= function(req , res){

    return res.render('user_signin',{
    
        title : 'SIGN-IN'

    })
}
 


module.exports.signup= function(req , res){

    return res.render('user_signup',{
    
        title : 'SIGN-up'

    })
}



module.exports.create= function(req , res){

    console.log(req.body)
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

    // COMMING AFTER BREAK :)

};

