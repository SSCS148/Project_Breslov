const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { apiLimiter } = require('./middlewares/rateLimiter');

dotenv.config();

// CORS configuration: use environment variable or allow all in development
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
  : ['http://localhost:8080', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../client/dist')));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Global error handler for Multer and other errors
const multer = require('multer');
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // Multer-specific errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: `Upload error: ${error.message}` });
  } else if (error) {
    // Other errors
    return res.status(400).json({ message: error.message });
  }
  next();
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // Allow connection even without token (read-only access)
  // If you want to require authentication, uncomment the lines below
  /*
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }
  */

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.authenticated = true;
    } catch (err) {
      // Invalid token, but allow connection for read-only access
      socket.authenticated = false;
    }
  } else {
    socket.authenticated = false;
  }

  next();
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log(`User connected (authenticated: ${socket.authenticated})`);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Only authenticated users can emit new comments and posts
  socket.on('new-comment', (data) => {
    if (socket.authenticated) {
      io.emit('new-comment', data);
    } else {
      socket.emit('error', { message: 'Authentication required to post comments' });
    }
  });

  socket.on('new-post', (data) => {
    if (socket.authenticated) {
      io.emit('new-post', data);
    } else {
      socket.emit('error', { message: 'Authentication required to create posts' });
    }
  });
});

const PORT = process.env.PORT || 5002;

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Error syncing database:', err);
});
