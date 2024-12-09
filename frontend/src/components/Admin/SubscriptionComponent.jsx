import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../../components/Admin/AdminNav';

const SubscriptionComponent = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    duration: 'monthly',
    price: 0,
    discount: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Plan/subscriptions');
        setSubscriptions(response.data);
      } catch (err) {
        setError('Failed to fetch subscriptions');
        console.error('Error fetching subscriptions:', err);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/Plan/subscriptions', newSubscription);
      setSubscriptions([...subscriptions, response.data]);
      setNewSubscription({ name: '', duration: 'monthly', price: 0, discount: 0 });
    } catch (err) {
      setError('Failed to add subscription');
      console.error('Error adding subscription:', err);
    }
  };

  const handleDeleteSubscription = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Plan/subscriptions/${id}`);
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
    } catch (err) {
      setError('Failed to delete subscription');
      console.error('Error deleting subscription:', err);
    }
  };

  return (
    <div className="bg-white w-full">
      <AdminNav/>
      <div className="mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Subscriptions</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-6">
  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Subscription Name</label>
  <input
    id="name"
    type="text"
    placeholder="Enter subscription name"
    value={newSubscription.name}
    onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
  />
  
  <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
  <input
    id="price"
    type="number"
    placeholder="Enter price"
    value={newSubscription.price}
    onChange={(e) => setNewSubscription({ ...newSubscription, price: e.target.value })}
    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
  />

  <label htmlFor="discount" className="block text-gray-700 font-semibold mb-2">Discount</label>
  <input
    id="discount"
    type="number"
    placeholder="Enter discount"
    value={newSubscription.discount}
    onChange={(e) => setNewSubscription({ ...newSubscription, discount: e.target.value })}
    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
  />

  <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">Duration</label>
  <select
    id="duration"
    value={newSubscription.duration}
    onChange={(e) => setNewSubscription({ ...newSubscription, duration: e.target.value })}
    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
  >
    <option value="monthly">Monthly</option>
    <option value="quarterly">Quarterly</option>
    <option value="yearly">Yearly</option>
  </select>

  <button
    onClick={handleAddSubscription}
    className="bg-blue-500 text-white p-2 rounded-md mt-4"
  >
    Add Subscription
  </button>
</div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Duration</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Discount</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No subscriptions found
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr key={sub._id} className="border-t hover:bg-gray-100">
                  <td className="py-4 px-4">{sub.name}</td>
                  <td className="py-4 px-4">{sub.duration}</td>
                  <td className="py-4 px-4">${sub.price}</td>
                  <td className="py-4 px-4">{sub.discount}%</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDeleteSubscription(sub._id)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default SubscriptionComponent;
