const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/userCtrl');


//Signup
router.post('/signup', userCtrl.signup);

//Login
router.post('/login', userCtrl.login);

//auth
//router.get('/jwtid', userCtrl.requireAuth);

module.exports = router;