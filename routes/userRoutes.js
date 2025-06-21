const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userIP', userController.getUserIP);
router.get('/visitors', userController.getVisitors);


module.exports = router;
