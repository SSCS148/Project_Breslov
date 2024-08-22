const fs = require('fs');
const path = require('path');
const Post = require('../models/Post'); // Assurez-vous que le chemin est correct

// Controller pour créer un nouveau post
exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const photo = req.file ? req.file.filename : null;
        const userId = req.user.id;

        console.log('Received content:', content);
        console.log('Received photo:', photo);
        console.log('Received userId:', userId);

        const newPost = await Post.create({
            content,
            photo,
            userId,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post', error });
    }
};

// Controller pour récupérer tous les posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
};

// Controller pour supprimer un post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        // Rechercher le post
        const post = await Post.findOne({ where: { id: postId, userId } });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or you do not have permission to delete this post' });
        }

        // Supprimer la photo si elle existe
        if (post.photo) {
            const photoPath = path.join(__dirname, '../uploads', post.photo);
            console.log('Deleting photo at:', photoPath);
            fs.unlink(photoPath, (err) => {
                if (err) {
                    console.error('Error deleting photo:', err);
                }
            });
        }

        // Supprimer le post
        await post.destroy();
        res.status(200).json({ message: 'Post and photo deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post', error });
    }
};
