import React from 'react';
import ReportComponent from '../../components/Admin/reportComponent';
import AdminNav from '../../components/Admin/AdminNav';
const ReportPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full  bg-white shadow-lg rounded-lg">
        
        <AdminNav/>
        <ReportComponent />
      </div>
    </div>
  );
};

export default ReportPage;
