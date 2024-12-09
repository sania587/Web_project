import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { path: "/AdminDashboard", label: "Dashboard" },
    { path: "/reports", label: "Report And Analysis" },
    { path: "/manageTrainers", label: "Manage Trainers" },
    { path: "/manageusers", label: "Manage Customers" },
    { path: "/payment", label: "Payment Monitoring" },
    { path: "/manage-subscriptions", label: "Manage Subscription Plan" },
    { path: "/feedback", label: "View Feedback" },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Navigation links displayed in a row */}
      <div className="flex space-x-4">
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
              location.pathname === link.path
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminNav;
