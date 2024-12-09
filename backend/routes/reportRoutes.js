const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to get all reports and analysis
router.get('/analysis', reportController.getAllReports);

// Route to get progress of all users
router.get('/user-progress', reportController.getUserProgress);

// Route to get average report data
router.get('/average', reportController.getAverageReportData);

module.exports = router;
