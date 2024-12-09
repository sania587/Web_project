const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to get all payments
router.get('/', paymentController.getAllPayments);
// Add delete route to the payment router
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
