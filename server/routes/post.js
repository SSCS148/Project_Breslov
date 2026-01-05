const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const likeController = require('../controllers/likeController');
const authenticateToken = require('../middlewares/auth');
const { postLimiter } = require('../middlewares/rateLimiter');
const { validatePost } = require('../middlewares/validation');
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

// File filter to validate image types
const fileFilter = (req, file, cb) => {
  // Allowed image MIME types
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

// Configure Multer with size limits and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
});

// Routes for post creation and retrieval with rate limiting and validation
router.post('/', authenticateToken, postLimiter, upload.single('photo'), validatePost, postController.createPost);
router.get('/', postController.getPosts);

// Route to delete a post
router.delete('/:id', authenticateToken, postController.deletePost);

// Routes for liking and unliking posts
router.post('/:id/like', authenticateToken, likeController.likePost);
router.post('/:id/unlike', authenticateToken, likeController.unlikePost);

module.exports = router;
