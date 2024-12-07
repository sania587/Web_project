import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainersList = () => {
  const [trainers, setTrainers] = useState([]);
  const [filters, setFilters] = useState({ rating: '', availability: '', specialty: '' });
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/trainers', { params: filters });

        // Ensure the data is an array
        if (Array.isArray(data)) {
          setTrainers(data);
        } else {
          setTrainers([]); // Fallback to an empty array if the data is not an array
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
        setError('Failed to fetch trainers');
        setTrainers([]); // Fallback to an empty array in case of error
      } finally {
        setLoading(false); // Stop loading once the request finishes
      }
    };

    fetchTrainers();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Trainers List</h2>

      {/* Filter Inputs */}
      <div className="mb-6 space-y-4 md:flex md:space-x-6 md:space-y-0">
        <input
          name="rating"
          type="number"
          placeholder="Minimum Rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          name="availability"
          type="text"
          placeholder="Availability"
          value={filters.availability}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          name="specialty"
          type="text"
          placeholder="Specialty"
          value={filters.specialty}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Loading, Error, or Trainers List */}
      {loading ? (
        <p className="text-xl text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-xl text-red-600">{error}</p> // Show error message if fetching fails
      ) : trainers.length === 0 ? (
        <p className="text-xl text-gray-600">No trainers found.</p> // Show message if no trainers found
      ) : (
        <ul className="space-y-4">
          {trainers.map((trainer) => (
            <li key={trainer.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-semibold text-gray-800">{trainer.name}</h3>
              <p className="text-gray-600 mt-2">Rating: {trainer.rating}</p>
              <p className="text-gray-600 mt-2">Specialties: {trainer.specializations.join(', ')}</p>
              <p className="text-gray-600 mt-2">Availability: {trainer.availability}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainersList;
