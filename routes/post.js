const passport= require('passport');

const express= require('express');
const router = express.Router();    
const postController= require('../controllers/postController')

router.post('/create' , passport.checkAuthenticatedUser, postController.userPosts)
router.get('/delete/:id', passport.checkAuthenticatedUser, postController.deletePost)
router.get('/postsection',postController.postSection);
router.get('/postView/:id',postController.postview);

module.exports= router;