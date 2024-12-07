const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'customer'], required: true },
  profileDetails: {
    age: Number,
    gender: String,
    healthGoals: String, // For customers
    specializations: [String], // For trainers
    certifications: [String], // For trainers
  },
  notifications: [{ type: String }], // Notifications
  feedback: [
    { 
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      rating: Number
    }
  ],
  
  // Additional fields for password reset functionality
  resetToken: { 
    type: String, 
    default: null 
  },
  resetTokenExpiration: { 
    type: Date, 
    default: null 
  },
}, { timestamps: true });

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
