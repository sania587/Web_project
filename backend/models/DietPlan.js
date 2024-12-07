const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the diet plan
  description: { type: String }, // Brief description
  durationWeeks: { type: Number, required: true }, // Duration in weeks
  calorieIntake: { type: Number, required: true }, // Recommended daily calorie intake
  meals: [
    {
      mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true }, // Type of meal
      foodItems: [
        {
          name: { type: String, required: true }, // Food item name
          quantity: { type: String, required: true }, // Quantity (e.g., 100g, 1 cup)
          calories: { type: Number, required: true }, // Calorie count per item
        },
      ],
    },
  ],
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users assigned to this plan
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Trainer who created the plan
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', DietPlanSchema);
