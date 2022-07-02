const express= require('express');
const router = express.Router();
const likes=require('../controllers/likesController');

router.post('/toggle',likes.liked);

module.exports =router;