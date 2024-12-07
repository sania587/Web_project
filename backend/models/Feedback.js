const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  message: String,
  rating: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
