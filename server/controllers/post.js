const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const photo = req.file ? req.file.filename : null;
        const userId = req.user.id;

        const newPost = await Post.create({
            content,
            photo,
            userId,
        });

        res.status(201).json(newPost);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error creating post:', error.message);
        }
        res.status(500).json({ message: 'Failed to create post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching posts:', error.message);
        }
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findOne({ where: { id: postId, userId } });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or you do not have permission to delete this post' });
        }

        if (post.photo) {
            const photoPath = path.join(__dirname, '../uploads', post.photo);
            fs.unlink(photoPath, (err) => {
                if (err && process.env.NODE_ENV === 'development') {
                    console.error('Error deleting photo:', err.message);
                }
            });
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error deleting post:', error.message);
        }
        res.status(500).json({ message: 'Failed to delete post' });
    }
};