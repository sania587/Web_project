// Example: backend/controllers/authController.js
const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Simulate OTP generation or fetching user by email
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Send OTP via email (using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajataimoor1937@gmail.com',  
        pass: 'fitPass123',      
      },
    });

    const mailOptions = {
      from: 'rajataimoor1937@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Error during forgot-password process:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};
