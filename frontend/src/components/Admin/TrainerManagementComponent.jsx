import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../../components/Admin/AdminNav'; // Import AdminNav
import { FaUser, FaTrashAlt, FaBan } from 'react-icons/fa'; // Import icons for delete and block

const TrainerManagementComponent = () => {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch all trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/managetrainers');
        setTrainers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching trainers', err);
        setTrainers([]);
      }
    };

    fetchTrainers();
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/managetrainers/search?name=${search}`);
      setTrainers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error searching trainers', err);
      setTrainers([]);
    }
  };

  const handleDeleteTrainer = async (id) => {
    console.log("Deleting trainer with ID:", id); // Log the ID
    try {
      await axios.delete(`http://localhost:5000/api/managetrainers/${id}`);
      setTrainers(trainers.filter(trainer => trainer._id !== id));
    } catch (err) {
      console.error('Error deleting trainer', err);
    }
  };

  // Handle block trainer
  const handleBlockTrainer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/managetrainers/block/${id}`);
      setTrainers(trainers.filter(trainer => trainer._id !== id));
    } catch (err) {
      console.error('Error blocking trainer', err);
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="w-full p-6"> {/* Replaced container with w-full */}
        <h1 className="text-3xl font-semibold text-center mb-6">Manage Trainers</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/2"  // Adjusted width for search input
          />
          <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded-md">
            Search
          </button>
        </div>

        <div className="overflow-x-auto w-full"> {/* Set table to take full width */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Specializations</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No trainers found
                  </td>
                </tr>
              ) : (
                trainers.map((trainer) => (
                  <tr key={trainer._id} className="border-t hover:bg-gray-100">
                    <td className="py-4 px-4">{trainer.name}</td>
                    <td className="py-4 px-4">{trainer.email}</td>
                    <td className="py-4 px-4">{trainer.profileDetails.age}</td>
                    <td className="py-4 px-4">{trainer.profileDetails.specializations.join(', ')}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDeleteTrainer(trainer._id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 mr-2"
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        onClick={() => handleBlockTrainer(trainer._id)}
                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-300"
                      >
                        <FaBan />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainerManagementComponent;
