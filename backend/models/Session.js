const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['requested', 'approved', 'rejected', 'completed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
