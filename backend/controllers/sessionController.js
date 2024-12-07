const Session = require('../models/Session');
const User = require('../models/User');

// Create a new session request
const createSession = async (req, res) => {
  try {
    const { trainerId, customerId, date } = req.body;

    // Create a new session
    const newSession = new Session({
      trainerId,
      customerId,
      date,
      status: 'requested', // Default status is 'requested'
    });

    await newSession.save();

    // Add notifications for both trainer and customer
    const trainer = await User.findById(trainerId);
    const customer = await User.findById(customerId);
    trainer.notifications.push('You have a new session request.');
    customer.notifications.push('You have requested a session.');

    await trainer.save();
    await customer.save();

    res.status(201).json({ message: 'Session created successfully', session: newSession });
  } catch (err) {
    res.status(500).json({ message: 'Error creating session', error: err.message });
  }
};

// Update session status (approved/rejected/completed)
const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved', 'rejected', 'completed'
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.status = status;
    await session.save();

    // Add notifications for both user
    const trainer = await User.findById(session.trainerId);
    const customer = await User.findById(session.customerId);

    if (status === 'approved') {
      trainer.notifications.push('Your session has been approved.');
      customer.notifications.push('Your session request has been approved.');
    } else if (status === 'rejected') {
      trainer.notifications.push('Your session has been rejected.');
      customer.notifications.push('Your session request has been rejected.');
    }

    await trainer.save();
    await customer.save();

    res.status(200).json({ message: `Session ${status} successfully`, session });
  } catch (err) {
    res.status(500).json({ message: 'Error updating session status', error: err.message });
  }
};

// Get all sessions for a user (both trainer and customer)
const getSessionsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sessions = await Session.find({
      $or: [{ trainerId: userId }, { customerId: userId }],
    }).populate('trainerId customerId'); // Populate user data

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions', error: err.message });
  }
};

module.exports = {
  createSession,
  updateSessionStatus,
  getSessionsForUser,
};
