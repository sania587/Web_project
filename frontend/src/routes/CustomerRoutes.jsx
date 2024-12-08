import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CustomerSignupPage from '../pages/Customer/CustomerSignupPage';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<CustomerSignupPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
