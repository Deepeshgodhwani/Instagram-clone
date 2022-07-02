const express= require('express');
const router = express.Router();
const followingCont =require('../controllers/user_following');

router.get('/following',followingCont.following)
module.exports = router;