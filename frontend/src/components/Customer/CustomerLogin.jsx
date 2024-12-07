import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';  // Import login action from authSlice

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action with the user's email and password
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 border border-orange-500 border-2">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login to FitHum</h2>
      
      {/* Email Input */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Password Input */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700">
          Forgot your password?
        </a>
      </div>

      {/* Optionally, Add Social Login Button */}
      {/* You can add social login buttons here if needed */}
    </form>
  );
};

export default CustomerLogin;
