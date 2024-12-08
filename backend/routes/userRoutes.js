const express = require('express');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);
router.route('/send-mail').post(sendMail);
router.route('/authenticate').post(middleware.verifyUser, (req, res) => res.end());

// GET Methods
router.route('/generate-otp').get(middleware.verifyUser, middleware.localVariables, controller.generateOTP);
router.route('/verify-otp').get(middleware.verifyUser, controller.verifyOTP);
router.route('/create-reset-session').get(controller.createResetSession);

// PUT Methods
router.route('/reset-password').put(middleware.verifyUser, controller.resetPassword);

module.exports = router;
