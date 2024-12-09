const User = require('../models/User');
const Progress = require('../models/Progress');
const mongoose = require('mongoose');

// Get all reports and analysis (users' progress)
const getAllReports = async (req, res) => {
  try {
    const progressData = await Progress.aggregate([
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userInfo' } },
      { $unwind: '$userInfo' },
      { $project: { name: '$userInfo.name', goals: 1, completionStatus: 1, metrics: 1, date: 1 } }
    ]);
    res.json(progressData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};
const getUserProgress = async (req, res) => {
    try {
      // Fetch all progress data from the Progress collection
      const userProgress = await Progress.find()
        .sort({ date: -1 }); // Optionally sort by date (latest first)
      
      // Send the data back as a response
      res.json(userProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user progress' });
    }
  };
  

// Get average report data
const getAverageReportData = async (req, res) => {
  try {
    const averageData = await Progress.aggregate([
      { $group: {
          _id: null,
          avgCaloriesBurned: { $avg: '$metrics.caloriesBurned' },
          avgStepsTaken: { $avg: '$metrics.stepsTaken' },
          avgDistanceCovered: { $avg: '$metrics.distanceCovered' }
        }
      }
    ]);
    res.json(averageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching average report data' });
  }
};

module.exports = {
  getAllReports,
  getUserProgress,
  getAverageReportData
};
