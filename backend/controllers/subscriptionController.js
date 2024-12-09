const Subscription = require('../models/Subscription');

// Controller to get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Failed to fetch subscriptions' });
  }
};

// Controller to add a new subscription
const addSubscription = async (req, res) => {
  try {
    const { name, duration, price, discount } = req.body;
    const newSubscription = new Subscription({ name, duration, price, discount });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).json({ message: 'Failed to add subscription' });
  }
};

// Controller to delete a subscription
const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    res.status(500).json({ message: 'Failed to delete subscription' });
  }
};

module.exports = {
  getAllSubscriptions,
  addSubscription,
  deleteSubscription,
};
