const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController'); // Import the session controller

// Create a new session request
router.post('/create', sessionController.createSession);

// Update session status (approved/rejected/completed)
router.post('/update-status/:id', sessionController.updateSessionStatus);

// Get all sessions for a user (both trainer and customer)
router.get('/sessions/:userId', sessionController.getSessionsForUser);

module.exports = router;
