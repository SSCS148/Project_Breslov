const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const authenticateToken = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

// Configurer le stockage Multer pour les photos des posts
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

// Routes pour la création et la récupération des posts
router.post('/', authenticateToken, upload.single('photo'), postController.createPost);
router.get('/', postController.getPosts);

// Route pour supprimer un post
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;
