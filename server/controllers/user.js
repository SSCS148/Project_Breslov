const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '31d' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '31d' });
  return { accessToken, refreshToken };
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, age });

    const tokens = generateTokens(newUser);

    res.status(201).json({ message: 'User registered successfully', tokens });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error registering user:', error.message);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const tokens = generateTokens(user);

    res.status(200).json({ message: 'Login successful', tokens });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logging in user:', error.message);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    res.json({ exists: !!user });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking email:', error.message);
    }
    res.status(500).json({ message: 'Error checking email' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching users:', error.message);
    }
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokens = generateTokens({ id: decoded.id });

    res.json(tokens);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error refreshing token:', error.message);
    }
    res.status(500).json({ message: 'Error refreshing token' });
  }
};