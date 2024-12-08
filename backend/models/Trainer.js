const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    specialization: { type: String },
    availability: { type: [String] }, // Time slots
});

module.exports = mongoose.model('Trainer', trainerSchema);
