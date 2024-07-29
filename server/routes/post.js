const express = require('express');
const postController = require('../controllers/post');
const authenticateToken = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

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

module.exports = (io) => {
  const router = express.Router();

  router.post('/', authenticateToken, upload.single('photo'), (req, res) => postController.createPost(req, res, io));
  router.get('/', postController.getPosts);

  return router;
};
