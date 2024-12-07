import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerLoginPage from '../pages/Customer/CustomerLoginPage';
import CustomerSignupPage from '../pages/Customer/CustomerSignupPage';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/signup" element={<CustomerSignupPage />} />
    </Routes>
  );
};

export default CustomerRoutes;
