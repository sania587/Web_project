const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, searchUserByName } = require('../controllers/userManageController');

// Route to get all users
router.get('/', getAllUsers);

// Route to delete a user by id
router.delete('/:id', deleteUser);

// Route to search user by name
router.get('/search/:name', searchUserByName);

module.exports = router;
