// Input validation middleware to prevent XSS and ensure data integrity

// Sanitize string input to prevent XSS attacks
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;

  // Remove potentially dangerous characters
  return str
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .trim();
};

// Validate comment input
const validateComment = (req, res, next) => {
  const { comment, postId } = req.body;

  // Check if comment exists
  if (!comment || typeof comment !== 'string') {
    return res.status(400).json({ message: 'Comment is required and must be a string' });
  }

  // Check comment length
  if (comment.trim().length === 0) {
    return res.status(400).json({ message: 'Comment cannot be empty' });
  }

  if (comment.length > 1000) {
    return res.status(400).json({ message: 'Comment must be less than 1000 characters' });
  }

  // Validate postId
  if (!postId || !Number.isInteger(Number(postId))) {
    return res.status(400).json({ message: 'Valid postId is required' });
  }

  // Sanitize comment
  req.body.comment = sanitizeInput(comment);

  next();
};

// Validate post input
const validatePost = (req, res, next) => {
  const { content } = req.body;

  // Check if content exists
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ message: 'Content is required and must be a string' });
  }

  // Check content length
  if (content.trim().length === 0) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  if (content.length > 5000) {
    return res.status(400).json({ message: 'Content must be less than 5000 characters' });
  }

  // Sanitize content
  req.body.content = sanitizeInput(content);

  next();
};

// Validate user registration input
const validateRegistration = (req, res, next) => {
  const { name, email, password, age } = req.body;

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Valid name is required' });
  }

  if (name.length > 100) {
    return res.status(400).json({ message: 'Name must be less than 100 characters' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  // Validate password strength
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (password.length > 128) {
    return res.status(400).json({ message: 'Password must be less than 128 characters' });
  }

  // Validate age if provided
  if (age !== undefined && age !== null && age !== '') {
    const ageNum = Number(age);
    if (!Number.isInteger(ageNum) || ageNum < 13 || ageNum > 120) {
      return res.status(400).json({ message: 'Age must be between 13 and 120' });
    }
  }

  // Sanitize string inputs
  req.body.name = sanitizeInput(name);
  req.body.email = email.trim().toLowerCase();

  next();
};

// Validate login input
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Validate email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Validate password
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password is required' });
  }

  req.body.email = email.trim().toLowerCase();

  next();
};

module.exports = {
  validateComment,
  validatePost,
  validateRegistration,
  validateLogin,
  sanitizeInput,
};
