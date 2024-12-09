import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import AdminNav from "../../components/Admin/AdminNav"; // Import the AdminNav component

const PaymentComponent = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment');
        setPayments(response.data);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error('Error fetching payments:', err);
      }
    };

    fetchPayments();
  }, []);

  // Delete payment by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/payment/${id}`);
      setPayments(payments.filter(payment => payment._id !== id)); // Update the list after deleting
    } catch (err) {
      setError('Failed to delete payment');
      console.error('Error deleting payment:', err);
    }
  };

  return (
    <div className="bg-white w-full">
      <AdminNav />

      <div className="mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Manage Payments</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Conditionally render table or "No data found" message */}
        {payments.length === 0 ? (
          <p className="text-gray-500 text-center">No data found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-t hover:bg-gray-100">
                    <td className="py-4 px-4">{payment._id}</td>
                    <td className="py-4 px-4">{payment.userId.name}</td>
                    <td className="py-4 px-4">${payment.amount}</td>
                    <td className="py-4 px-4">{payment.status}</td>
                    <td className="py-4 px-4">{payment.type}</td>
                    <td className="py-4 px-4">{new Date(payment.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(payment._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
