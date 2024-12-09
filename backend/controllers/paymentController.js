const Payment = require('../models/Payment');

// Controller to get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find(); // Populate user details
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'payment not found' });
    }
    res.json({ message: 'payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Failed to delete payment' });
  }
};

module.exports = {
  getAllPayments,
  deletePayment,
};