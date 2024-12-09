import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../../components/Admin/AdminNav'; // Ensure this component is in the correct path

const FeedbackComponent = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('trainer');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedbackList(response.data);
      } catch (error) {
        setError('Failed to fetch feedback');
        console.error('Error fetching feedback:', error);
      }
    };
  
    fetchFeedback();
  }, []); // Empty dependency array ensures it runs once on mount
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError('Please enter a valid search query');
      return;
    }
    axios
      .get('http://localhost:5000/api/feedback/search', {
        params: { [searchType]: searchQuery },
      })
      .then((response) => setFeedbackList(response.data))
      .catch((error) => {
        setError('Error searching feedback');
        console.error('Error searching feedback:', error);
      });
  };
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/feedback/${id}`)
      .then(() => {
        // Remove the deleted feedback from the state
        setFeedbackList(feedbackList.filter(feedback => feedback._id !== id));
        setFeedbackMessage('Feedback deleted successfully');
        setTimeout(() => setFeedbackMessage(''), 3000);
      })
      .catch((error) => {
        setError('Error deleting feedback');
        console.error('Error deleting feedback:', error);
      });
  };
  return (
    <div className="bg-white w-full">
      <AdminNav />
      <div className="mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Manage Feedback</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {feedbackMessage && <p className="text-green-500 text-center">{feedbackMessage}</p>}

        <div className="mb-6">
          <label htmlFor="searchQuery" className="block text-gray-700 font-semibold mb-2">
            Search Feedback
          </label>
          <div className="flex space-x-4">
            <input
              id="searchQuery"
              type="text"
              placeholder={searchType === 'trainer' ? 'Trainer Username' : 'Customer Username'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-4 w-full"
            />
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="trainer">By Trainer</option>
              <option value="customer">By Customer</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-md mb-4"
            >
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-left">Trainer</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
  {feedbackList.length === 0 ? (
    <tr>
      <td colSpan="5" className="py-4 text-center text-gray-500">
        No feedback found
      </td>
    </tr>
  ) : (
    feedbackList.map((feedback) => (
      <tr key={feedback._id} className="border-t hover:bg-gray-100">
        <td className="py-4 px-4">{feedback.trainerId ? feedback.trainerId.name : 'N/A'}</td>
        <td className="py-4 px-4">{feedback.customerId ? feedback.customerId.name : 'N/A'}</td>
        <td className="py-4 px-4">{feedback.rating}</td>
        <td className="py-4 px-4">{feedback.message}</td>
        <td className="py-4 px-4">
          <button
            onClick={() => handleDelete(feedback._id)}
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

export default FeedbackComponent;
