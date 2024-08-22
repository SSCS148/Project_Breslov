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

// Route to delete a comment
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);

        if (comment) {
            await comment.destroy();
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
});

// Route to unlike a comment (decrement like)
router.post('/unlike', authMiddleware, async (req, res) => {
    try {
        const { commentId } = req.body;
        const comment = await Comment.findByPk(commentId);
        if (comment) {
            if (comment.likes > 0) {
                comment.likes -= 1;
                await comment.save();
                res.status(200).json(comment);
            } else {
                res.status(400).json({ message: 'Cannot unlike. No likes to remove.' });
            }
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error unliking comment:', error);
        res.status(500).json({ message: 'Failed to unlike comment', error });
    }
});


module.exports = router;
