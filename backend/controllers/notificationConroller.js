const User = require('../models/User');

// Add a notification for a user
const addNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.notifications.push(message);
    await user.save();

    res.status(200).json({ message: 'Notification added successfully', notifications: user.notifications });
  } catch (err) {
    res.status(500).json({ message: 'Error adding notification', error: err.message });
  }
};

// Get all notifications for a user
const getNotificationsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ notifications: user.notifications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

module.exports = {
  addNotification,
  getNotificationsForUser,
};
