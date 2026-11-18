
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
   'http://localhost:5174'
  ]
}));

app.use(express.json());

// Temporary in-memory user storage
const users = [];

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from the .env file');
}

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    if (username.trim().length < 3 || password.length < 6) {
      return res.status(400).json({
        message: 'Username must be at least 3 characters and password at least 6 characters'
      });
    }

    const existingUser = users.find(
      user => user.username === username.trim()
    );

    if (existingUser) {
      return res.status(409).json({
        message: 'Username already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      username: username.trim(),
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Registration successful'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during registration'
    });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    const user = users.find(
      user => user.username === username.trim()
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    const token = jwt.sign(
      { username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during login'
    });
  }
});

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. Token required.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid or expired token'
      });
    }

    req.user = decoded;
    next();
  });
}

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'You accessed the protected route successfully!',
    username: req.user.username
  });
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'JWT Authentication API is running'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
