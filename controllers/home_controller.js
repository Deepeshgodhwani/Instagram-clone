module.exports.home= function(req , res){

   console.log(req.cookies)
   res.cookie('deepesh', 20);
    return res.render('home', {

        tittle : 'HOLAA!!'
    })
}


