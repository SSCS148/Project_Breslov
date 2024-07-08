const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Comment = require('../models/Comment');  // Importez directement le modèle Comment

// Route pour poster un commentaire
router.post('/', authMiddleware, async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('User ID:', req.user.id);

        const { comment, postId } = req.body;
        const newComment = await Comment.create({ comment, postId, userId: req.user.id });

        console.log('New comment created:', newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ message: 'Failed to post comment', error });
    }
});

// Route pour récupérer tous les commentaires
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments', error });
    }
});

// Route pour aimer un commentaire
router.post('/like', authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.body;
        const comment = await Comment.findByPk(commentId);
        if (comment) {
            comment.likes += 1;
            await comment.save();
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error liking comment:', error);
        res.status(500).json({ message: 'Failed to like comment', error });
    }
});

module.exports = router;