const mongoose = require('mongoose');

// Define the Admin Schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], required: true },
  profileDetails: {
    age: Number,
    gender: String
  },
  notifications: [{ type: String }],
  feedback: [
    { 
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      rating: Number
    }
  ],
  resetToken: { type: String, default: null },
  resetTokenExpiration: { type: Date, default: null },
}, { timestamps: true });

// Create and export the Admin model
module.exports = mongoose.model('Admin', AdminSchema);
