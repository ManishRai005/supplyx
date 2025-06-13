const express = require('express');
const router = express.Router();
const { login, register, refreshToken, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);

// Protected routes
router.post('/logout', auth, logout);

// Get current user route
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
    });
  }
});

module.exports = router; 