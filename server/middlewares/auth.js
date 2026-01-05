const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Log only in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('Token verification error:', error.message);
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};