const express = require('express');
const router = express.Router();

//Posts
router.get('/post/all');
router.post('/post/publish');
router.delete('/post/:id');

//Comments
router.get('/post/comments/:id');

//Likes
router.post('/like/:id')

module.exports = router;