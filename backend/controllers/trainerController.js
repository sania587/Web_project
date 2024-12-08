const Trainer = require('../models/Trainer');
const WorkoutPlan = require('../models/WorkoutPlan');

// Get trainer profile
exports.getTrainerProfile = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.user.id);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.json(trainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update trainer profile
exports.updateTrainerProfile = async (req, res) => {
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedTrainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create workout plan
exports.createWorkoutPlan = async (req, res) => {
    try {
        const newPlan = await WorkoutPlan.create(req.body);
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
