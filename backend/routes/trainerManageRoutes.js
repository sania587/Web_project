const express = require('express');
const router = express.Router();
const trainerManageController = require('../controllers/trainerManageController');

// Route to get all trainers
router.get('/', trainerManageController.getAllTrainers);

// Route to search trainers by name
router.get('/search', trainerManageController.searchTrainerByName);

// Route to delete a trainer
router.delete('/:id', trainerManageController.deleteTrainer);

// Route to block (delete) a trainer
router.delete('/block/:id', trainerManageController.blockTrainer);

module.exports = router;
