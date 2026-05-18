const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/validateMiddleware');

// POST /api/auth/signup
router.post('/signup', signupValidation, signup);

// POST /api/auth/login
router.post('/login', loginValidation, login);

module.exports = router;
