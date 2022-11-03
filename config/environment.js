


const development = {
 
    name:'development',
    asset_path:'assets',
    session_cokie_key:'blahblah',
    db:'SOCIAL-MEDIA-APP_db',
    smtp:{
 
        service :'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
             user: 'deepeshgodwani28@gmail.com',
             pass: 'jyqcqbdflxasbbts'
        }
   },
    facebook_client_id: 815704369848691,
    facebook_client_secret:"755ac5fad26895e13617df18cc59a212",
    facebook_call_backURL:  "http://localhost:8000/account/auth/facebook/callback"

}


const production ={

    name:process.env.INSTA_CLONE_INVIRONMENT,
    asset_path:process.env.ASSET_PATH,
    session_cokie_key:process.env.INSTA_CLONE_SESSION_COOKIE_KEY,
    db:process.env.DB,
    smtp:{
 
        service :'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
             user: 'deepeshgodwani28@gmail.com',
             pass: 'jyqcqbdflxasbbts'
        }
   },
    google_client_id: process.env.INSTA_CLONE_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.INSTA_CLONE_GOOGLE_CLIENT_secret,
    google_call_backURL: process.env.INSTA_CLONE_GOOGLE_CALL_BACKURL
}

// module.exports=eval(process.env.INSTA_CLONE_INVIRONMENT) == undefined ? development : eval(process.env.INSTA_CLONE_INVIRONMENT);


module.exports =development;