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
        const itemType = req.body.itemType === "series" ? "series" : "movie";
        const tags = normalizeTags(req.body.tags);
        const lastStopped = normalizeLastStopped(itemType, req.body.lastStopped || req.body);

        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                message: "Title, content, and author are required"
            });
        }

        const post = await Post.create({
            title,
            content,
            author,
            itemType,
            tags,
            lastStopped
        });

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

function normalizeTags(value) {
    if (Array.isArray(value)) {
        return value.map(cleanTag).filter(Boolean);
    }

    if (typeof value === "string") {
        return value.split(",").map(cleanTag).filter(Boolean);
    }

    return [];
}

function cleanTag(tag) {
    return typeof tag === "string" ? tag.trim().toLowerCase() : "";
}

function normalizeLastStopped(itemType, value) {
    if (itemType === "movie") {
        return {
            season: 0,
            episode: 0,
            time: ""
        };
    }

    return {
        season: toNonNegativeNumber(value.season),
        episode: toNonNegativeNumber(value.episode),
        time: typeof value.time === "string" ? value.time.trim() : ""
    };
}

function toNonNegativeNumber(value) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue < 0) {
        return 0;
    }

    return Math.floor(numberValue);
}

module.exports = {
    getPosts,
    createPost,
    deletePost
};