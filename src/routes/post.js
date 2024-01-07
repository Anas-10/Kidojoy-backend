// post.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

// Route for uploading a new post
router.post('/upload', postController.uploadNewPost);


router.get('/', postController.getAllPosts);


module.exports = router;
