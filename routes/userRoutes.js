const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userIP', userController.getUserIP);

module.exports = router;
