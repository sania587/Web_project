import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as per your file structure
import bg from "../assets/ask-role-bg.jpg";

const AskRole = ({ isAuthenticated, handleLogout, userId }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "admin") {
      navigate("/signup/admin");
    } else if (role === "trainer") {
      navigate("/signup/trainer");
    } else if (role === "customer") {
      navigate("/signup/customer");
    }
  };

  return (
    <div>
      {/* Background with blurred effect, only the background image is blurred */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          filter: "blur(8px)",
          WebkitFilter: "blur(8px)",
        }}
      >
        {/* Empty container for background */}
      </div>

      {/* Overlay to make the background slightly darker */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Main content, this part is not affected by the blur */}
      <div className="relative z-20 flex justify-center items-center min-h-screen">
        {/* Content Box */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 w-3/4 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">How you want to sign up?</h2>
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => handleRoleSelection("admin")}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg"
            >
              As an Admin
            </button>
            <button
              onClick={() => handleRoleSelection("trainer")}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg"
            >
              As a Trainer
            </button>
            <button
              onClick={() => handleRoleSelection("customer")}
              className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg"
            >
              As a Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskRole;
