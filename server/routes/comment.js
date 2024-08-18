const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Comment = require('../models/Comment'); // Import Comment model directly

// Route to post a comment
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

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments', error });
    }
});

// Route to like a comment
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
