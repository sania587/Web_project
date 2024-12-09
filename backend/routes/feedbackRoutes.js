const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

// Routes for feedback management
router.get('/', feedbackController.getAllFeedback); // Get all feedback
router.delete('/:id', feedbackController.deleteFeedback); // Delete feedback by ID
router.get('/search', feedbackController.searchFeedback); // Search feedback

module.exports = router;
