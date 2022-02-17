const express = require('express');
const router = express.Router();
const postCtrl = require('../controlers/postCtrl');
const commentCtrl = require('../controlers/commentCtrl');
const likeCtrl = require('../controlers/likeCtrl');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const { deleteComment } = require('../controlers/commentCtrl');
const { deletePost } = require('../controlers/postCtrl');



//Posts
router.get('/post/all', auth, postCtrl.getAllPosts);
router.post('/post/publish', auth, multer, postCtrl.publishPost);
router.delete('/post/:id', auth, postCtrl.deletePost);

//Comment
router.post('/post/comment', auth, commentCtrl.commentPost);
router.get('/post/comment/:postId', auth, commentCtrl.getAllComments);
router.delete('/post/comment/:postId', auth, commentCtrl.deleteComment);


//Likes
router.post('/post/like', auth, likeCtrl.likePosts);
router.delete('/post/unlike/:postId', auth, likeCtrl.unlikePosts);
router.get('/post/like/:postId', auth, likeCtrl.getAllLike);


module.exports = router;