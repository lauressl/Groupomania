const express = require('express');
const router = express.Router();

//User infos
router.get('/me');
router.post('/me');
router.delete('/me');

//User post
router.get('/me/post');

module.exports = router;