// userRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/userController');  // Correct import for controller functions
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Define login route
router.post('/login', login);  // This should handle POST requests to /api/users/login

// Other routes, like signup, if needed
router.post('/signup', signup);

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Use `req.user.id` to get the authenticated user's ID
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const profileDetails = {
      age: user.profileDetails?.age,
      gender: user.profileDetails?.gender,
      healthGoals: user.profileDetails?.healthGoals,
    };
    res.status(200).json({ ...user.toObject(), profileDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Fetch Profile
router.get("/:id/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Update Profile
router.put("/:id/profile", protect, async (req, res) => {
  try {
    const { name, email, age, gender, healthGoals } = req.body;
    const updates = {
      name,
      email,
      profileDetails: {
        age,
        gender,
        healthGoals,
      },
    };

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Create Payment
router.post('/payment', protect, async (req, res) => {
  try {
    const { userId, amount, paymentMethod, transactionId, status, type } = req.body;

    // Validate input
    if (!userId || !amount || !paymentMethod || !transactionId || !status || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new payment
    const payment = new Payment({
      userId,
      amount,
      paymentMethod,
      transactionId,
      status,
      type,
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment created successfully.',
      payment: {
        id: payment._id,
        userId: payment.userId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId,
        status: payment.status,
        type: payment.type,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get Subscription Details
router.get('/subscription', async (req, res) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await User.findById(userId).populate('subscription');

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({
        message: 'Subscription details fetched successfully.',
        subscription: user.subscription,
      });
    } else {
      // Fetch subscription details for unauthorized users
      const subscription = await Subscription.findOne({ status: 'active' });

      if (!subscription) {
        return res.status(404).json({ message: 'No active subscription found.' });
      }

      res.status(200).json({
        message: 'Subscription details fetched successfully.',
        subscription,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
