const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); // Import the notification controller

// Add a notification for a user
router.post('/add-notification/:userId', notificationController.addNotification);

// Get all notifications for a user
router.get('/notifications/:userId', notificationController.getNotificationsForUser);

module.exports = router;
