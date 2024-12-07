const express = require('express');
const {
  getAssignedPlans,
  getTrainers,
  getProgressReports,
} = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Middleware to protect routes

const router = express.Router();

router.get('/plans', isAuthenticated, getAssignedPlans);
router.get('/trainers', isAuthenticated, getTrainers);
router.get('/progress', isAuthenticated, getProgressReports);

module.exports = router;
