import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSubscriptionDetails } from '../../services/api';

const SubscriptionDetails = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is required.');
        }
        const response = await getSubscriptionDetails(userId);
        setSubscription(response.subscription);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Subscription Details</h1>
      {subscription ? (
        <div>
          <p>Plan: {subscription.plan.name}</p>
          <p>Start Date: {subscription.startDate}</p>
          <p>End Date: {subscription.endDate}</p>
          <p>Status: {subscription.status}</p>
        </div>
      ) : (
        <p>No subscription found.</p>
      )}
    </div>
  );
};

export default SubscriptionDetails;
