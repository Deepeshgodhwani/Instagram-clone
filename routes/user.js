const express= require('express');
const passport= require('passport')

const router = express.Router();
const userController= require('../controllers/user_controller');



router.get('/user_home',passport.checkAuthenticatedUser, userController.homeuser);
router.get('/profile',passport.checkAuthenticatedUser, userController.profile);
router.get('/signin',userController.signin)
router.get('/signup',userController.signup)
router.use('/post', require('../routes/post'))


router.post('/create' , userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'signin'}
), userController.createSession)


router.get('/signout', userController.destroySession);
module.exports = router;