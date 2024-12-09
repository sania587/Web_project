import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice"; // Import login action from your redux slice

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Dispatch the login thunk with user credentials
  //     const resultAction = await dispatch(login({ email, password }));

  //     if (login.fulfilled.match(resultAction)) {
  //       // Login was successful
  //       alert("Login Successful!");
  //       navigate("/dashboard");
  //     } else {
  //       // Handle login error
  //       alert(resultAction.payload || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));

      if (login.fulfilled.match(resultAction)) {
        // Login was successful
        alert("Login Successful!");
        navigate("/AdminDashboard"); // Navigate to the dashboard
      } else {
        // Handle login error
        alert(resultAction.payload || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Welcome Back!
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your credentials to access your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      {/* Create Account and Forgot Password */}
      <div className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        
  <button
    onClick={() => navigate("/ask-role")} // Redirect to AskRole page
    className="text-indigo-600 font-semibold hover:underline"
  >
    Create New Account
  </button>
        <br />
        <button
          onClick={() => navigate("/forgot-password")}
          className="text-indigo-600 font-semibold hover:underline mt-2"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
