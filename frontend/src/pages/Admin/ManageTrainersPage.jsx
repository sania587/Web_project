import React from 'react';
import TrainerManagementComponent from '../../components/Admin/TrainerManagementComponent';
import AdminNav from '../../components/Admin/AdminNav';

const ManageTrainersPage = () => {
  return (
    <div className="page-container">
      <AdminNav /> {/* Include AdminNav here */}
      <div className=" mt-1">
        <TrainerManagementComponent />
      </div>
    </div>
  );
};

export default ManageTrainersPage;
