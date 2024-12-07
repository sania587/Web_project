const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Environment variables (e.g., JWT secret)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// @desc User signup
// @route POST /api/users/signup
// @access Public
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      age,
      gender,
      healthGoals,
      specializations,
      certifications,
    } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the profileDetails object (this is the new part)
    const profileDetails = {
      age,
      gender,
      healthGoals,
      specializations,
      certifications,
    };

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileDetails,  // Add profileDetails to the user
    });

    await user.save();

    // Generate a token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileDetails: user.profileDetails,  // Return profile details as well
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// @desc User login
// @route POST /api/users/login
// @access Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password.' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a token
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileDetails: user.profileDetails,  // Return profile details
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
