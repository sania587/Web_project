import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CustomerSignupPage from '../pages/Customer/CustomerSignupPage';
import Sessions from '../pages/Customer/Sessions';
import Notifications from '../pages/Customer/Notifications';
import ProfilePage from '../pages/ProfilePage';
import SubscriptionDetails from '../pages/Customer/SubscriptionDetails';

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<CustomerSignupPage />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/subscription" element={<SubscriptionDetails />} />
    </Routes>
  );
};

export default CustomerRoutes;
