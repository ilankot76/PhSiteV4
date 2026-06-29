const mongoose = require("mongoose");
const Post = require("../models/postModel");

async function getPosts(req, res) {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return res.json({
            success: true,
            posts: posts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error loading posts"
        });
    }
}

async function createPost(req, res) {
    try {
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
        const content = typeof req.body.content === "string" ? req.body.content.trim() : "";
        const author = typeof req.body.author === "string" ? req.body.author.trim() : "";

        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                message: "Title, content, and author are required"
            });
        }

        const post = await Post.create({ title, content, author });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: post
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating post"
        });
    }
}

async function deletePost(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post"
        });
    }
}

module.exports = {
    getPosts,
    createPost,
    deletePost
};
