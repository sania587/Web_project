import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/slices/authSlice"; // Assuming you have a signup action
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',  // Fixed as admin since this is for admin signup
    age: '',
    gender: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Ensure password has at least one alphabet
    const re = /[a-zA-Z]/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender) {
      setError('All fields are required.');
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    // Validate password (at least one alphabet)
    if (!validatePassword(formData.password)) {
      setError('Password must contain at least one alphabet.');
      return;
    }

    setError(''); // Clear previous error

    try {
      // Make the API call to the admin signup endpoint
      const response = await axios.post('http://localhost:5000/api/admin/signup', formData);

      // Check if the response contains a valid token
      if (response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem("token", token); // Store JWT in localStorage
        alert("Signup successful! Redirecting to dashboard...");
        navigate("/AdminDashboard");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(`An error occurred during signup. Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Admin Account</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>

      {/* Login Redirect */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
