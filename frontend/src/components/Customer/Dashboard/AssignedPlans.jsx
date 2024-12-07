import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignedPlans = () => {
  const [plans, setPlans] = useState({ workoutPlan: null, dietPlan: null });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/plans');
        setPlans(data);
      } catch (error) {
        console.error('Error fetching assigned plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Assigned Plans</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Workout Plan:</h3>
          <p className="text-lg text-gray-600">{plans.workoutPlan || 'No workout plan assigned yet.'}</p>
        </div>

        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Diet Plan:</h3>
          <p className="text-lg text-gray-600">{plans.dietPlan || 'No diet plan assigned yet.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AssignedPlans;
