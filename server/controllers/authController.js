const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.dirname(USERS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Helper: Read users from file
const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper: Write users to file
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Helper: Generate JWT
const generateJWT = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET || 'flowboard_secret',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

const authController = {
  googleLogin: async (req, res) => {
    try {
      const { googleId, email, name, profilePicture } = req.body;

      if (!googleId || !email || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let users = getUsers();
      let user = users.find(u => u.googleId === googleId || u.email === email);

      if (!user) {
        user = {
          id: `user_${Date.now()}`,
          googleId,
          email,
          name,
          profilePicture,
          isVerified: true,
          createdAt: new Date().toISOString(),
        };
        users.push(user);
        saveUsers(users);
      }

      const token = generateJWT(user);
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
        },
      });
    } catch (err) {
      console.error('Google login error:', err);
      res.status(500).json({ error: 'Google login failed' });
    }
  },

  emailSignup: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let users = getUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = {
        id: `user_${Date.now()}`,
        email: email.toLowerCase(),
        name,
        passwordHash,
        isVerified: false,
        createdAt: new Date().toISOString(),
      };

      users.push(user);
      saveUsers(users);

      const token = generateJWT(user);
      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Signup failed' });
    }
  },

  emailLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      let users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user || !user.passwordHash) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = generateJWT(user);
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      let users = getUsers();
      const user = users.find(u => u.id === req.user.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      });
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ error: 'Failed to get user' });
    }
  },

  logout: async (req, res) => {
    res.json({ message: 'Logged out' });
  },
};

module.exports = authController;
