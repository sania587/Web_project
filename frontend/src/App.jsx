import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice"; // Import logout action
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import CustomerSignupPage from "./pages/Customer/CustomerSignupPage";
import Dashboard from "./pages/Customer/dashboardPage";
import "./index.css";
import AskRole from "./pages/AskRole";
import AdminSignup from "./pages/Admin/AdminSignupPage";
import TrainerSignup from "./pages/Trainer/TrainerSignup";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask-role" element={<AskRole />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/signup/trainer" element={<TrainerSignup />} />
        <Route path="/signup/customer" element={<CustomerSignupPage />} />
        <Route 
          path="/" 
          element={
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/gym-img.jpg)' }}>
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to FitHum!</h1>
                <p className="text-xl mb-6">Your journey to fitness starts here. Join us and unlock your potential!</p>
                <Link to="/dashboard">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
