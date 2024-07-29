const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Codes ANSI pour les couleurs
const ANSI_RED = '\x1b[31m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_RESET = '\x1b[0m';

// Function to generate tokens
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
      console.log(`${ANSI_RED}[Register Attempt] Existing email: ${email}${ANSI_RESET}`);
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, age });

    const tokens = generateTokens(newUser);

    console.log(`${ANSI_GREEN}[User Registered]\nName: ${name}\nEmail: ${email}\nAge: ${age}${ANSI_RESET}`);
    res.status(201).json({ message: 'User registered successfully', tokens });
  } catch (error) {
    console.error(`${ANSI_RED}Error registering user: ${error}${ANSI_RESET}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`${ANSI_RED}[Login Attempt] Non-existent email: ${email}${ANSI_RESET}`);
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`${ANSI_RED}[Login Attempt] Invalid password for email: ${email}${ANSI_RESET}`);
      return res.status(400).json({ message: 'Invalid password' });
    }

    const tokens = generateTokens(user);

    console.log(`${ANSI_GREEN}[User Logged In]\nEmail: ${email}${ANSI_RESET}`);
    res.status(200).json({ message: 'Login successful', tokens });
  } catch (error) {
    console.error(`${ANSI_RED}Error logging in user: ${error}${ANSI_RESET}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check if email exists
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });

    res.json({ exists: !!user });
  } catch (error) {
    console.error(`${ANSI_RED}Error checking email: ${error}${ANSI_RESET}`);
    res.status(500).json({ error: 'Error checking email' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(`${ANSI_RED}Error fetching users: ${error}${ANSI_RESET}`);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Refresh token
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
    console.error(`${ANSI_RED}Error refreshing token: ${error}${ANSI_RESET}`);
    res.status(500).json({ error: 'Error refreshing token' });
  }
};