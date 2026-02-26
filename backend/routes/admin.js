const express = require('express');
const jsend = require('jsend');

const db = require('../models')
var PostService = require('../services/PostService');
const { isAdmin } = require('../middleware/authMiddleware');
const UserService = require('../services/UserService');
var postService = new PostService(db);
var userService = new UserService(db);


const router = express.Router();
router.use(jsend.middleware);

router.get('/dashboard', isAdmin, async (req, res) => {
    const posts = await postService.getAllPosts();
    res.jsend.success({posts: posts})
})

router.post('/events/create', isAdmin, async (req, res) => {
    const { title, content, imgUrl, eventDate } = req.body;

    try {
        const createdPost = await postService.createPost(title, content, imgUrl, eventDate);

        res.redirect('/admin/dashboard')
    } catch (error) {
        res.jsend.fail(error)
    }
})

router.post('/users/:id', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.jsend.error({statusCode: 500, message: "What the fuck? Something is VERY wrong..."})
        }
        const {newRole} = req.body;

        const updatedUser = await userService.updateUserRole(userId, newRole);

        res.jsend.success({data: updatedUser})
    } catch (error) {
        throw error;
    }
})

module.exports = router;