// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');  // Correct import path for admin routes
const authRoutes = require('./routes/authRoutes');
const userManageRoutes = require('./routes/userManageRoutes');
const trainerManageRoutes = require('./routes/trainerManageRoutes');
const SubscriptionRoutes = require('./routes/subscriptionsRoutes'); // Correct import
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const app = express();

dotenv.config();

// Middleware
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/counts', adminDashboardRoutes);
app.use('/api/admin', adminRoutes);  // Admin routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/users',userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/managetrainers', trainerManageRoutes);
app.use('/api/Plan', SubscriptionRoutes);

app.use('/api/manageusers', userManageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
