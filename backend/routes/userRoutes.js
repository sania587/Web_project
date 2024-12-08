// userRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/userController');  // Correct import for controller functions

const router = express.Router();

// Define login route
router.post('/login', login);  // This should handle POST requests to /api/users/login

// Other routes, like signup, if needed
router.post('/signup', signup);

module.exports = router;
