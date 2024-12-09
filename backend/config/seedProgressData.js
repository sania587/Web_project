const mongoose = require("mongoose");
const Progress = require("../models/Progress"); // Adjust the path as necessary
const User = require("../models/User"); // Assuming you have a User model
const Trainer = require("../models/Trainer"); // Trainer model
const Payment = require("../models/Payment"); // Payment model
const Subscription = require("../models/Subscription"); // Subscription model
const Feedback = require("../models/Feedback"); // Feedback model
require('dotenv').config(); // Load environment variables from .env file

MONGODB_URI = "mongodb+srv://teamsproject987:admin987@cluster0.tloi5.mongodb.net/fitness-website";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await User.deleteMany({});
    // Dummy data for Users
    const dummyUsers = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'customer',
        profileDetails: {
          age: 25,
          gender: 'Male',
          healthGoals: 'Lose weight'
        },
        notifications: ['Welcome to the fitness app!', 'Your goal for the week: 5 workouts'],
        feedback: [],
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'customer',
        profileDetails: {
          age: 30,
          gender: 'Female',
          healthGoals: 'Gain muscle'
        },
        notifications: ['Remember to track your workouts!'],
        feedback: [],
      }
    ];

    // Insert dummy users
    const insertedUsers = await User.insertMany(dummyUsers);
    console.log('Users inserted:', insertedUsers);
    await Progress.deleteMany({});
    // Dummy data for Progress
    const dummyProgress = [
      {
        user: insertedUsers[0]._id, // John Doe
        date: new Date(),
        activities: ['Jogging', 'Weightlifting'],
        goals: 'Jog for 30 minutes, complete 3 sets of weightlifting exercises',
        completionStatus: true,
        comments: 'Great session, feeling stronger!',
        metrics: {
          caloriesBurned: 350,
          stepsTaken: 5000,
          distanceCovered: 5,
        },
        progressPhotos: [{ url: 'http://example.com/photo1.jpg' }],
      },
      {
        user: insertedUsers[1]._id, // Jane Smith
        date: new Date(),
        activities: ['Cycling'],
        goals: 'Cycling for 45 minutes',
        completionStatus: false,
        comments: 'Was too tired to complete the goal.',
        metrics: {
          caloriesBurned: 200,
          stepsTaken: 2000,
          distanceCovered: 10,
        },
        progressPhotos: [{ url: 'http://example.com/photo2.jpg' }],
      }
    ];

    // Insert dummy progress
    const insertedProgress = await Progress.insertMany(dummyProgress);
    console.log('Progress entries inserted:', insertedProgress);
    await Trainer.deleteMany({});
    // Dummy data for Trainer
    const dummyTrainers = [
      {
        name: 'Mark Johnson',
        email: 'mark.johnson@fitness.com',
        password: 'password123',
        role: 'trainer',
        profileDetails: {
          age: 35,
          gender: 'Male',
          specializations: ['Weightlifting', 'Cardio'],
          certifications: ['Certified Personal Trainer', 'Fitness Nutritionist']
        },
        notifications: ['You have a new customer session!'],
        feedback: [],
      }
    ];

    // Insert dummy trainers
    const insertedTrainers = await Trainer.insertMany(dummyTrainers);
    console.log('Trainers inserted:', insertedTrainers);
    await Payment.deleteMany({});
    // Dummy data for Payment
    const dummyPayments = [
      {
        userId: insertedUsers[0]._id,
        amount: 50,
        status: 'success',
        type: 'payment'
      },
      {
        userId: insertedUsers[1]._id,
        amount: 30,
        status: 'pending',
        type: 'payment'
      }
    ];

    // Insert dummy payments
    const insertedPayments = await Payment.insertMany(dummyPayments);
    console.log('Payments inserted:', insertedPayments);
    await Subscription.deleteMany({});
    // Dummy data for Subscription
    const dummySubscriptions = [
      {
        name: 'Basic Plan',
        duration: 'monthly',
        price: 30,
        discount: 5
      },
      {
        name: 'Premium Plan',
        duration: 'yearly',
        price: 300,
        discount: 10
      }
    ];

    // Insert dummy subscriptions
    const insertedSubscriptions = await Subscription.insertMany(dummySubscriptions);
    console.log('Subscriptions inserted:', insertedSubscriptions);
    await Feedback.deleteMany({});
    // Dummy data for Feedback
    const dummyFeedback = [
      {
        trainerId: insertedTrainers[0]._id,
        customerId: insertedUsers[0]._id,
        sessionId: insertedProgress[0]._id, // Linking to progress entry
        message: 'Great session, learned a lot!',
        rating: 5
      },
      {
        trainerId: insertedTrainers[0]._id,
        customerId: insertedUsers[1]._id,
        sessionId: insertedProgress[1]._id, // Linking to progress entry
        message: 'Couldn\'t complete the session, but the trainer was very helpful.',
        rating: 4
      }
    ];

    // Insert dummy feedback
    const insertedFeedback = await Feedback.insertMany(dummyFeedback);
    console.log('Feedback entries inserted:', insertedFeedback);

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  })
  .finally(() => {
    // Close the connection after inserting data
    mongoose.connection.close();
  });
