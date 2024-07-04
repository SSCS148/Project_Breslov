const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors()); // Activez CORS pour toutes les routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../client')));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use(express.json());

app.get('/api/some-secured-route', verifyToken, (req, res) => {
  res.json({ message: 'Access granted', userId: req.userId });
});

// Ajout d'un endpoint de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const PORT = process.env.PORT || 5002;

sequelize.sync({ alter: true }).then(async () => {
  console.log('Database synced');
  const User = require('./models/User');

  const user1 = await User.findOne({ where: { email: 'user1@example.com' } });
  const user2 = await User.findOne({ where: { email: 'user2@example.com' } });

  if (!user1) {
    await User.create({
      name: 'User1',
      email: 'user1@example.com',
      password: 'password1',
    });
  }
  if (!user2) {
    await User.create({
      name: 'User2',
      email: 'user2@example.com',
      password: 'password2',
    });
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.get('/test-upload', (req, res) => {
  res.sendFile(path.join(__dirname, '../uploads'));
});