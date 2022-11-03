const passport= require('passport');
const express= require('express');
const router = express.Router();    
const postController= require('../controllers/postController')

router.post('/create' , passport.checkAuthenticatedUser, postController.userPosts)
router.get('/delete/:id', passport.checkAuthenticatedUser, postController.deletePost)
router.get('/postsection', passport.checkAuthenticatedUser,postController.postSection);
router.get('/postView/:id',passport.checkAuthenticatedUser,postController.postview);

module.exports= router;