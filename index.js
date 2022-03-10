const express = require('express');
const app = express();
const port = 8000;



app.listen(port , function(err){

    if (err)
    {
        console.log(`ERROR FOUNDS IN SERVER RUNNING: ${err}`);
    }
    else{
        
        console.log(`SERVER IS RUNNING ON PORT : ${port}`);
    }
})