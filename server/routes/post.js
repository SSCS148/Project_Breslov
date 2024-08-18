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

// Route to like a post
router.post('/like', authenticateToken, postController.likePost);

// Route to delete a post
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
