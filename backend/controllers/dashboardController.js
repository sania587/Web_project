const User = require('../models/User');

exports.getAssignedPlans = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authenticated user
    const user = await User.findById(userId).populate('workoutPlan dietPlan'); // Populate related data
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json({
      workoutPlan: user.workoutPlan, 
      dietPlan: user.dietPlan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTrainers = async (req, res) => {
  try {
    const { rating, availability, specialty } = req.query;
    let query = { role: 'trainer' };

    if (rating) query['rating'] = { $gte: rating };
    if (availability) query['availability'] = availability;
    if (specialty) query['specializations'] = { $in: [specialty] };

    const trainers = await User.find(query, 'name email rating specializations availability');
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProgressReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json(user.progressReports); // Assuming progressReports is an array in the schema
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
