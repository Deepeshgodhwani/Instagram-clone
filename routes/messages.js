const express= require('express');
const router = express.Router();

const controller =require('../controllers/messagesCont');


router.get('/' ,controller.messagesSection);

module.exports = router;