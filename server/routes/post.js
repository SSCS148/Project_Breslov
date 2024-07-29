const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const authenticateToken = require('../middlewares/auth'); // Ensure this path is correct
const multer = require('multer');
const path = require('path'); // Ajout de l'importation de 'path'

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
router.post('/', authenticateToken, upload.single('photo'), postController.createPost);
router.get('/', postController.getPosts);

module.exports = router;