const passport= require('passport');

const express= require('express');
const router = express.Router();
const postController= require('../controllers/postController')

router.post('/create' , passport.checkAuthenticatedUser, postController.userPosts)



module.exports= router;