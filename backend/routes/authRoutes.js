const express = require('express');
const {registerUser, loginUser, getUserProfile} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
// Register a new user
router.post('/register', registerUser);
// Login a user
router.post('/login', loginUser);
// Get user profile
router.get('/profile', protect, getUserProfile);


module.exports = router;

