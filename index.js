const { Router } = require('express');
const express = require('express');
const app = express();
const port = 8000;
const db= require('./config/mongoose');

const cookieParser= require("cookie-parser")

app.use(express.urlencoded())

app.use(cookieParser());

// USE THE ROUTERS//

app.use('/', require('./routes'));

//setup veiw engine //

app.set('view engine','ejs');
app.set('views', './views');

app.use(express.static('assets'))

app.listen(port , function(err){

    if (err)
    {
        console.log(`ERROR FOUNDS IN SERVER RUNNING: ${err}`);
    }
    else{
        
        console.log(`SERVER IS RUNNING ON PORT : ${port}`);
    }
})