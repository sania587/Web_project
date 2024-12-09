// controllers/adminDashboardController.js
const User = require('../models/User');
const Trainer = require('../models/Trainer');
const Feedback = require('../models/Feedback');

// Get user count
const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ userCount: count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get trainer count
const getTrainerCount = async (req, res) => {
  try {
    const count = await Trainer.countDocuments();
    res.json({ trainerCount: count });
  } catch (error) {
    console.error('Error fetching trainer count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get feedback count
const getFeedbackCount = async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.json({ feedbackCount: count });
  } catch (error) {
    console.error('Error fetching feedback count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserCount,
  getTrainerCount,
  getFeedbackCount,
};