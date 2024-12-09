const Trainer = require('../models/Trainer');

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const trainer = await Trainer.findByIdAndDelete(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Block a trainer (removing them from the database)
exports.blockTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const trainer = await Trainer.findByIdAndDelete(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.json({ message: 'Trainer blocked and removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Search trainers by name
exports.searchTrainerByName = async (req, res) => {
  try {
    const { name } = req.query;
    const trainers = await Trainer.find({ name: { $regex: name, $options: 'i' } });

    if (trainers.length === 0) {
      return res.status(404).json({ message: 'No trainers found' });
    }

    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
