const express = require('express');
const router = express.Router();
const profileCtrl = require('../controlers/profileCtrl');
const userCtrl = require('../controlers/userCtrl');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')


//User infos
router.get('/me', auth, profileCtrl.getProfile);
//router.post('/me');
router.delete('/me/:id', auth, profileCtrl.deleteProfile);
router.put('/me', auth, multer, profileCtrl.updateProfile);

//All Users
router.get('/all', auth, userCtrl.getAllUsers);

//User post
//router.get('/me/post');

module.exports = router;