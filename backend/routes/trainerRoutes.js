const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Trainer = require('../models/Trainer'); // Import the Trainer model

// Signup endpoint for trainers
app.post('/signup', async (req, res) => {
  const { name, email, password, expertise, experience } = req.body;

  try {
    // Check if the email already exists
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({ message: 'Trainer with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new trainer instance
    const newTrainer = new Trainer({
      name,
      email,
      password: hashedPassword,
      role: 'trainer', // Ensure the role is set to 'trainer'
      profileDetails: {
        expertise,  // Store expertise (e.g., Weightlifting, Cardio, Yoga)
        experience, // Store years of experience
      }
    });

    // Save the trainer to the database
    await newTrainer.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newTrainer._id, email: newTrainer.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    res.status(201).json({
      message: 'Trainer Signup Successful!',
      token,
      trainerId: newTrainer._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});
