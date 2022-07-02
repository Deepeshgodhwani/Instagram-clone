const passport= require('passport');

const express= require('express');
const router = express.Router();


const commentController= require('../controllers/comment.cont')

router.post('/create' , passport.checkAuthenticatedUser, commentController.userComment)
router.get('/delete/:id',passport.checkAuthenticatedUser, commentController.deleteComments)



module.exports= router;