import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [plans, setPlans] = useState(null);
  const [progressReports, setProgressReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Replace with your auth token retrieval logic

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const planRes = await axios.get('/api/dashboard/plans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const progressRes = await axios.get('/api/dashboard/progress', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPlans(planRes.data);
        setProgressReports(progressRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Your Assigned Plans</h2>
        <div>
          <p><strong>Workout Plan:</strong> {plans?.workoutPlan?.name || 'No plan assigned'}</p>
          <p><strong>Diet Plan:</strong> {plans?.dietPlan?.name || 'No plan assigned'}</p>
        </div>
      </section>

      <section>
        <h2>Progress Reports</h2>
        {progressReports.length > 0 ? (
          <ul>
            {progressReports.map((report, index) => (
              <li key={index}>
                <p>Date: {new Date(report.date).toLocaleDateString()}</p>
                <p>Details: {report.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No progress reports available.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
