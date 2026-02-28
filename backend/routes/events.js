const express = require('express');
const jsend = require('jsend');

const db = require('../models');
var PostService = require('../services/PostService');
var postService = new PostService(db);

const router = express.Router();
router.use(jsend.middleware)

router.get('/', (req, res) => {
    res.jsend.success('Posts!')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await postService.getPost(id);

    res.jsend.success({status: "success", data: post})
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content, imgUrl, eventDate } = req.body;
    const post = await postService.editPost(id, title, content, imgUrl, eventDate );

    res.redirect(`/events/${id}`)
})

router.get('/getEvents', async (req, res) => {
    const posts = await postService.getAllPosts();
    res.jsend.success({status: "success", data: posts})
})

module.exports = router;