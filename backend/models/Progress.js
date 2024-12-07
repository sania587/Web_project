const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    activities: [
      {
        type: String, // Activities performed by the user (e.g., "Jogging", "Weightlifting")
        required: true,
      },
    ],
    goals: {
      type: String, // Short description of goals for the day or period
      required: true,
    },
    completionStatus: {
      type: Boolean, // Indicates if the day's goals were achieved
      default: false,
    },
    comments: {
      type: String, // Optional notes or feedback from the user or trainer
    },
    metrics: {
      caloriesBurned: {
        type: Number, // Calories burned during activities
        required: true,
      },
      stepsTaken: {
        type: Number, // Total steps taken (useful for activity tracking)
        required: true,
      },
      distanceCovered: {
        type: Number, // Distance covered in kilometers/miles
        required: true,
      },
    },
    progressPhotos: [
      {
        url: String, // URL of the progress photo
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Progress", ProgressSchema);
