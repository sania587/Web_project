const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/SubscriptionController');

// Get all subscriptions
router.get('/subscriptions', SubscriptionController.getAllSubscriptions);

// Add a new subscription
router.post('/subscriptions', SubscriptionController.addSubscription);

// Delete a subscription by ID
router.delete('/subscriptions/:id', SubscriptionController.deleteSubscription);

module.exports = router;
