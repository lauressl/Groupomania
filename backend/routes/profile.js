const express = require('express');
const { updateProfile } = require('../controlers/profileCtrl');
const router = express.Router();
const profileCtrl = require('../controlers/profileCtrl');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')


//User infos
router.get('/me', auth, profileCtrl.getProfile);
//router.post('/me');
router.delete('/me', auth, profileCtrl.deleteProfile);
router.put('/me', auth, multer, profileCtrl.updateProfile);

//User post
//router.get('/me/post');

module.exports = router;