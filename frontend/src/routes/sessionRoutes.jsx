const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Get all sessions for a user (either as customer or trainer)
router.get('/user/:userId', sessionController.getUserSessions);

// Update the status of a session
router.put('/:sessionId', sessionController.updateSessionStatus);

module.exports = router;
