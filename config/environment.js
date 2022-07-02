


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
    google_client_id: "920260713522-vs4j4tdeac8fs8erabepqp192fnq3fna.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_backURL:  "http://localhost:8000/user/auth/google/callback"

}


const production ={

    name:'production'
}

module.exports=development;