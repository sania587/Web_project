// routes/adminDashboardRoutes.js
const express = require("express");
const {
  getUserCount,
  getTrainerCount,
  getFeedbackCount,
} = require("../controllers/adminDashboardController");
const router = express.Router();

// Define routes
router.get("/user-count", getUserCount);
router.get("/trainer-count", getTrainerCount);
router.get("/feedback-count", getFeedbackCount);

module.exports = router;