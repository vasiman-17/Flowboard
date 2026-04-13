const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  googleLogin,
  emailSignup,
  emailLogin,
  getCurrentUser,
  logout,
} = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/google', googleLogin);
router.post('/register', emailSignup);
router.post('/login', emailLogin);
router.post('/logout', logout);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
