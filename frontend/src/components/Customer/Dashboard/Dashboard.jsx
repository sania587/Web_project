import React, { useState } from 'react';
import AssignedPlans from './AssignedPlans';
import TrainersList from './TrainersList';
import ProgressReports from './ProgressReports';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="tabs mb-4">
        <button onClick={() => setActiveTab('plans')} className={`tab ${activeTab === 'plans' ? 'active' : ''}`}>
          Assigned Plans
        </button>
        <button onClick={() => setActiveTab('trainers')} className={`tab ${activeTab === 'trainers' ? 'active' : ''}`}>
          Trainers List
        </button>
        <button onClick={() => setActiveTab('progress')} className={`tab ${activeTab === 'progress' ? 'active' : ''}`}>
          Progress Reports
        </button>
      </div>
      <div>
        {activeTab === 'plans' && <AssignedPlans />}
        {activeTab === 'trainers' && <TrainersList />}
        {activeTab === 'progress' && <ProgressReports />}
      </div>
    </div>
  );
};

export default Dashboard;
