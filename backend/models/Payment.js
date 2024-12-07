const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], required: true },
  type: { type: String, enum: ['payment', 'refund'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
