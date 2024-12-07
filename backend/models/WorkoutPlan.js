const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the workout plan
  description: { type: String }, // Brief description
  durationWeeks: { type: Number, required: true }, // Duration in weeks
  difficultyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  exercises: [
    {
      name: { type: String, required: true }, // Exercise name
      sets: { type: Number, required: true }, // Number of sets
      reps: { type: Number, required: true }, // Number of repetitions
      restTimeSeconds: { type: Number, required: true }, // Rest time between sets
      description: { type: String }, // Optional description of the exercise
    },
  ],
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users assigned to this plan
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Trainer who created the plan
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
