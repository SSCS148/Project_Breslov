const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

// Authentication and token refresh routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check-email', userController.checkEmail);
router.get('/users', userController.getAllUsers);
router.post('/refresh-token', userController.refreshToken);

// Secured route example
router.get('/some-secured-route', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', userId: req.user.id });
});

// Route to get all users
router.get('/all', authMiddleware, async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
