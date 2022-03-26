const express = require('express');
const app = express();
const port = 8000;
const db= require('./config/mongoose');
const cookieParser= require("cookie-parser")
// USED FOR SESSION COOKIE //
const session= require('express-session');
const passport =require('passport');
const localPassport= require('./config/passport-local');
const MongoStore=  require("connect-mongodb-session")(session);
const sassMiddleware= require("node-sass-middleware");
// const extended = require('it/lib/extended');


app.use(sassMiddleware({
    src: './assets/scss',
    dest :'./assets/css',
    debug: true,
    outputStyle:'extended',
    prefix: '/css'
}))

app.use(express.urlencoded())
app.use(cookieParser());


//setup veiw engine //

app.set('view engine','ejs');
app.set('views', './views');

app.use(express.static('assets'))

//MONGO STORE IS USED TO STORE THE SESSION COOKIE  IN THE DB// 

app.use(session({
    name :'codial', 
    //we will do this later //
    secret : 'blahblah',
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