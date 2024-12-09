import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from "../../components/Admin/AdminNav"; // Import the AdminNav component
import { FaUser, FaTrashAlt } from 'react-icons/fa'; // Import icons from react-icons

const ManageCustomersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/manageusers');
          console.log('Response Status:', response.status);  // Check the response status
          if (response.status === 200) {
            console.log('Users from backend:', response.data); // Log the full response data
            
            setUsers(response.data);
          } else {
            console.error('Error fetching users:', response.data);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      
    fetchUsers();
  }, []);

  // Search users by name
  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    const response = await axios.get(`http://localhost:5000/api/manageusers/search/${event.target.value}`);
    setUsers(response.data);
  };

  // Delete user by ID
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/manageusers/${id}`);
    setUsers(users.filter(user => user._id !== id)); // Update the list after deleting
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <AdminNav />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Manage Customers</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md w-1/3"
          />
          <div className="text-lg text-gray-600">Total Users: {users.length}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map(user => (
                  <tr key={user._id} className="border-t hover:bg-gray-100">
                    <td className="py-4 px-4">{user.name}</td>
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4">{user.role}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomersPage;
