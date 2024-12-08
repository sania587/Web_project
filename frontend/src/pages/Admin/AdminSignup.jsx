import React from "react";

const AdminSignup = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Admin Signup</h2>
      <form>
        {/* Add form fields here */}
        <input
          type="text"
          placeholder="Enter admin name"
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Enter email"
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Enter password"
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
