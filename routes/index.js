
const express = require('express');
const router = express.Router();
const account=require('../routes/account');
const userController= require('../controllers/user_controller');

const {renderExplore}=userController;





router.get('/', function(req,res){
    
     if(req.user){
        return  res.redirect('/user/user_home');
     }else{
        return res.render('signin',{type:false})
   }
});
router.use('/account/',account);
router.get('/explore',renderExplore);
router.use('/user/', require('./user'));


module.exports = router;