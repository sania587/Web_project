import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminSignupPage from '../pages/Admin/AdminSignupPage';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<AdminSignupPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
