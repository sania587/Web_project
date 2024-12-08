// controllers/adminController.js

const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1d' }
  );
};

// Admin Signup function
const signup = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    // Validate input
    if (!name || !email || !password || !age || !gender) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      age,
      gender,
    });

    await admin.save();

    // Generate a token
    const token = generateToken(admin);

    res.status(201).json({
      message: 'Admin registered successfully.',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        age: admin.age,
        gender: admin.gender,
      },
      token,
    });
  } catch (error) {
    console.error('Error in admin signup:', error.message);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = { signup }; 
