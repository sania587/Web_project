const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['workout', 'diet'], required: true },
  details: String,
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
