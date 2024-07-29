const express = require('express');
const commentController = require('../controllers/comment');
const authenticateToken = require('../middlewares/auth');

module.exports = (io) => {
  const router = express.Router();

  router.post('/', authenticateToken, (req, res) => commentController.createComment(req, res, io));
  router.get('/', commentController.getAllComments);
  router.post('/like', authenticateToken, commentController.likeComment);

  return router;
};
