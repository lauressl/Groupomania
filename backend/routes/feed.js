const express = require('express');
const router = express.Router();
const postCtrl = require('../controlers/postCtrl');
const commentCtrl = require('../controlers/commentCtrl');
const likeCtrl = require('../controlers/likeCtrl');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');



//Posts
router.get('/post/all', auth, postCtrl.getAllPosts);
router.post('/post/publish', auth, multer, postCtrl.publishPost);
//router.delete('/post/:id');

//Comment
router.post('/post/comment', auth, commentCtrl.commentPost);
router.get('/post/comment/:id', auth, commentCtrl.getAllComments);

//Likes
router.post('post/like', auth, likeCtrl.likePost);
router.get('post/like/:id', auth, likeCtrl.getAllLike);


module.exports = router;