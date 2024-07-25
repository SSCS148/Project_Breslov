const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://project-breslov.onrender.com', 'http://localhost:8080'],
    methods: ['GET', 'POST']
  }
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Middleware to verify JWT
const verifyToken = require('./middlewares/auth');

// Configure CORS to allow requests from your frontend domain
const allowedOrigins = ['https://project-breslov.onrender.com', 'http://localhost:8080'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

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
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
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

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Error syncing database:', err);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = io; // Exporter l'instance io pour l'utiliser dans d'autres fichiers
