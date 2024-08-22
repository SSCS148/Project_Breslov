const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const authenticateToken = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

// Configure Multer storage for post photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Routes for post creation and retrieval
router.post('/', authenticateToken, upload.single('photo'), postController.createPost);
router.get('/', postController.getPosts);

// Route to delete a post
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        // Find the post
        const post = await Post.findOne({ where: { id: postId, userId } });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or you do not have permission to delete this post' });
        }

        // Delete the post
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post', error });
    }
});

module.exports = router;
