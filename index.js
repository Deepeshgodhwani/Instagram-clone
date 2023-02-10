const express = require('express');
const app = express();
const port = 8000;
const env=require('./config/environment');
const db= require('./config/mongoose');
const cookieParser= require("cookie-parser")
// USED FOR SESSION COOKIE //
const session= require('express-session');
const passport =require('passport');
const localPassport= require('./config/passport-local');
const facebookStrategy= require('./config/passport_facebookAuth.js');
const MongoStore=  require("connect-mongodb-session")(session);
const sassMiddleware= require("node-sass-middleware");  
const path=require('path');                                                                                                                           

// const extended = require('it/lib/extended');


// setup the chat server to be used with socket.io //

const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000 ,function(err){
    if(err){
        console.log("error in listening socket servr");
    }else{
          
         console.log("chat server is listening on port 5000");
         
    }
});



if(env.name =='development'){
     
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest :path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle:'extended',
        prefix: '/css'
    }))

}


app.use(express.urlencoded())
app.use(cookieParser());

//setup veiw engine //

app.set('view engine','ejs');
app.set('views', './views');

 app.use(express.static(env.asset_path))
 app.use('/user/assets/images',express.static(__dirname+'/'+env.asset_path+'/images'));
 app.use('/account/password/assets/images',express.static(__dirname+'/'+env.asset_path+'/images'));
 app.use('/assets/images',express.static(__dirname+'/'+env.asset_path+'/images'));
 app.use('/user/post/assets/images',express.static(__dirname+'/'+env.asset_path+'/images'));


//MONGO STORE IS USED TO STORE THE SESSION COOKIE  IN THE DB// 

app.use(session({
    name :'codial', 
    secret : env.session_cokie_key,
    saveUninitialized: false,
    resave : false,
    cookie:{
        maxAge: (1000 * 60* 100)
    }, 
    store : new MongoStore(
    {
         mongooseConnection: db,
         autoRemove : 'disabled'
    }, function(err){
        console.log(err || 'connect mongodb setup ok')

        }    
    )

}
));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use('/uploads',express.static(__dirname+'/uploads'));


// USE THE ROUTERS//

app.use('/', require('./routes'));
app.listen(port , function(err){

    if (err)
    {
        console.log(`ERROR FOUNDS IN SERVER RUNNING: ${err}`);
    }
    else{
        
        console.log(`SERVER IS RUNNING ON PORT : ${port}`);
    }
})