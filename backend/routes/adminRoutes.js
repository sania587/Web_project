// routes/adminRoutes.js

const express = require('express');
const { signup } = require('../controllers/adminController');  // Correct import path

const router = express.Router();

// Admin Signup route
router.post('/signup', signup);  

module.exports = router;
