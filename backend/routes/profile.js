const express = require('express');
const router = express.Router();
const profileCtrl = require('../controlers/profileCtrl');

const auth = require('../middlewares/auth');


//User infos
router.get('/me', auth, profileCtrl.getProfile);
//router.post('/me');
router.delete('/me', auth, profileCtrl.deleteProfile);

//User post
//router.get('/me/post');

module.exports = router;