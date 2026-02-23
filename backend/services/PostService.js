class PostService {
    constructor(db) {
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
}

module.exports = PostService;