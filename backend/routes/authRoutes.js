const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Transporter setup for sending emails via Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',        // Your Gmail address
    pass: 'your-app-password',           // Your app-specific password
  },
});

// API route for forgot password (sending OTP)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Generate a random OTP (for demo purposes, using 123456)
  const otp = Math.floor(100000 + Math.random() * 900000);  // Random 6-digit OTP

  // Set up mail options
  const mailOptions = {
    from: 'your-email@gmail.com',       // Your Gmail address
    to: email,                          // Recipient email from the client
    subject: 'Password Reset OTP',
    text: `Your OTP is: ${otp}`,        // OTP content
  };

  try {
    // Send email with OTP
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Send OTP response to the client (In a real app, save the OTP in a database for verification)
    res.status(200).json({
      message: 'OTP sent successfully!',
      otp,  // For testing purposes, you might return the OTP here (but don't do it in production)
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
