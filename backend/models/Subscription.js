const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, enum: ['monthly', 'quarterly', 'yearly'], required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
