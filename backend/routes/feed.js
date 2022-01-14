const express = require('express');
const router = express.Router();
const postCtrl = require('../controlers/postCtrl');

const auth = require('../utils/auth');


//Posts
//router.get('/post/all');
router.post('/post/publish', auth, postCtrl.publishPost);
//router.delete('/post/:id');

//Comments
//router.get('/post/comments/:id');

//Likes
//router.post('/like/:id')

module.exports = router;