const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const path = require('path');
const jwt = require('jsonwebtoken'); // Cette ligne est maintenant incluse
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to verify JWT
const verifyToken = require('./middlewares/auth');
const allowedOrigins = ['https://project-breslov.onrender.com', 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../client/dist')));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/some-secured-route', verifyToken, (req, res) => {
  res.json({ message: 'Access granted', userId: req.userId });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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