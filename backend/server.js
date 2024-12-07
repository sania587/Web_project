// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS) if needed
app.use(express.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness Website API!');
});

// Add other routes for signup, login, etc.
// Example: User route
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
