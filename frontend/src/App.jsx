import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Customer/Navbar";
import CustomerLoginPage from "./pages/Customer/CustomerLoginPage";
import CustomerSignupPage from "./pages/Customer/CustomerSignupPage";
import Dashboard from "./pages/Customer/dashboardPage";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authentication
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/signup" element={<CustomerSignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
  
        
        {/* Welcome Page (Root) */}
        <Route 
          path="/" 
          element={
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/gym-img.jpg)' }}>
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
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
