// routes/adminRoutes.js

const express = require('express');
const { signup } = require('../controllers/adminController');  // Correct import path

const router = express.Router();

// Admin Signup route
router.post('/signup', signup);  // This should now reference the 'signup' function from adminController.js

module.exports = router;
