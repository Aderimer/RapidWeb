class PostService {
    constructor() {
        this.db = require('../models');
        this.Post = this.db.Post;
    }

    async createPost(title, content, imgUrl, eventDate) {
        try {
            const newPost = await this.Post.create({
                title, content, imgUrl, eventDate
            })
            return newPost
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts() {
        try {
            const posts = this.Post.findAll();
            return posts;
        } catch (error) {
            throw error;
        }
    }

    async getPost(_id) {
        try {
            const post = this.Post.findOne({
                where: { id: _id }
            })
            return post
        } catch (error) {
            throw error;
        }
    }

    async editPost(_id, newTitle, newContent, newImgUrl, newEventDate) {
        try {
            const post = this.Post.update({
                title: newTitle,
                content: newContent,
                imgUrl: newImgUrl,
                eventDate: newEventDate
            }, {where: {id:_id}})
            return post
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostService;