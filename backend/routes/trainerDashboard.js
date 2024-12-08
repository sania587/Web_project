import React from 'react';
import ProfileView from '../components/Trainer/ProfileView';
import AssignedPlans from '../components/Trainer/AssignedPlans';

const TrainerDashboard = () => {
    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600">Trainer Dashboard</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileView />
                <AssignedPlans />
            </div>
        </div>
    );
};

export default TrainerDashboard;
