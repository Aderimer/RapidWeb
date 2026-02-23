const express = require('express');
const jsend = require('jsend');

const db = require('../models')
var PostService = require('../services/PostService');
var postService = new PostService(db);


const router = express.Router();
router.use(jsend.middleware);

router.get('/dashboard', async (req, res) => {
    const posts = await postService.getAllPosts();
    res.jsend.success({posts: posts})
})

router.post('/events/create', async (req, res) => {
    const { title, content, imgUrl, eventDate } = req.body;

    try {
        const createdPost = await postService.createPost(title, content, imgUrl, eventDate);

        res.redirect('/admin/dashboard')
    } catch (error) {
        res.jsend.fail(error)
    }
})

module.exports = router;