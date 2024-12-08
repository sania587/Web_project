const express = require('express');
const { getTrainerProfile, updateTrainerProfile, createWorkoutPlan } = require('../controllers/trainerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Trainer Routes
router.get('/profile', authMiddleware, getTrainerProfile);
router.put('/profile', authMiddleware, updateTrainerProfile);
router.post('/plans', authMiddleware, createWorkoutPlan);

module.exports = router;
