const User = require('../models/User');

// Controller to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Users from DB:', users);  // Check if it's an array
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);  // Log error for more details
        res.status(500).json({ message: error.message });
    }
};


// Controller to delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to search a user by name
const searchUserByName = async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: req.params.name, $options: 'i' } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, searchUserByName };
