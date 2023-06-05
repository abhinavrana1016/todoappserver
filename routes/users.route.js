const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const {isAuthenticated} = require('../middleware/auth')
router.post('/register',userController.registerUser)
router.post('/verifyOtp',isAuthenticated, userController.verifyOtp)
router.post('/login', userController.loginuser)



module.exports = router;