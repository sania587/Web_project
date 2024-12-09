import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/slices/authSlice';  // Assuming you have a signup action
import { useNavigate } from 'react-router-dom';

const CustomerSignup = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    age: '',
    gender: '',
    healthGoals: '',
    specializations: '',
    certifications: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use useNavigate for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 3)); // Move to next page (max 3 pages)
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Go back to previous page (min 1 page)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Dispatch the signup action with all form data
      const resultAction = await dispatch(signup(formData)); // Dispatch signup action
  
      // Check if the response contains a valid token
      if (resultAction.payload && resultAction.payload.token) {
        // Assuming signup returns a payload with a token
        const { token } = resultAction.payload; // Extract token from payload
  
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('token', token);  // Save JWT token in localStorage
  
        // Show a success alert
        alert('Signup successful! Redirecting to dashboard...');
  
        // Redirect to the customer dashboard after signup
        navigate('/dashboard');
      } else {
        // If signup fails or token is not returned, show an error message
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };
  

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the CustomerLoginPage
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Your Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Page 1: Basic Information */}
        {currentPage === 1 && (
          <>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm font-medium text-gray-600">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="customer">Customer</option>
              </select>
            </div>
          </>
        )}

        {/* Page 2: Profile Details */}
        {currentPage === 2 && (
          <>
            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm font-medium text-gray-600">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium text-gray-600">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="healthGoals" className="text-sm font-medium text-gray-600">Health Goals</label>
              <textarea
                id="healthGoals"
                name="healthGoals"
                placeholder="Enter your health goals"
                value={formData.healthGoals}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        )}

        {/* Page 3: Additional Details for Trainers */}
        {currentPage === 3 && formData.role === 'trainer' && (
          <>
            <div className="flex flex-col">
              <label htmlFor="specializations" className="text-sm font-medium text-gray-600">Specializations</label>
              <input
                id="specializations"
                name="specializations"
                type="text"
                placeholder="Enter your specializations"
                value={formData.specializations}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="certifications" className="text-sm font-medium text-gray-600">Certifications</label>
              <input
                id="certifications"
                name="certifications"
                type="text"
                placeholder="Enter your certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          {currentPage > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
            >
              Back
            </button>
          )}
          <div className="text-center text-sm text-gray-600">
            {currentPage}/3
          </div>
          {currentPage < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-4 bg-indigo-600 text-white rounded-md"
            >
              Next
            </button>
          )}
          {currentPage === 3 && (
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Redirect to login page */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={handleLoginRedirect}
            className="text-indigo-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default CustomerSignup;
