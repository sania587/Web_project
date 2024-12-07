const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get notifications for a user
router.get('/:userId', notificationController.getNotifications);

module.exports = router;
