import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import Navbar from '../../components/Navbar';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/notifications`);
        setNotifications(response.data.notifications); // Assuming notifications are in this format
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-md">
              <p className="text-gray-700">{notification}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default Notifications;
