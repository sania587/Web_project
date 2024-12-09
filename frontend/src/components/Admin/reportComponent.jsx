import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa"; // For a refresh or loading icon
import axios from 'axios';

const ReportComponent = () => {
  const [userProgress, setUserProgress] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports/user-progress'); 
        const data = response.data;
        console.log("Data", data); // Log the data to check its structure
        setUserProgress(data); // Set the state with the fetched data
        console.log("User  Progress State After Set:", userProgress); // Log the state after setting
      } catch (err) {
        setError("Failed to fetch user progress data.");
        console.error("Error fetching data:", err);
      }
    };
    fetchUserProgress();
  }, []);
  useEffect(() => {
    console.log("Updated User Progress State:", userProgress);
  }, [userProgress]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProgress = userProgress.filter((user) =>
    user && user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="w-full p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">User  Progress Report</h1>
  
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md w-1/3"
          />
          <div className="text-lg text-gray-600">
            Total Records: {filteredProgress.length}
          </div>
        </div>
  
        <div className="overflow-x-auto w-full">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : userProgress.length === 0 ? (
            <div className="flex justify-center items-center mt-10">
              <p className="text-gray-500 text-xl">No data found</p>
            </div>
          ) : (
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">User  ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Calories Burned</th>
                  <th className="py-3 px-4 text-left">Activities</th>
                </tr>
              </thead>
              <tbody>
  {filteredProgress.map((report) => (
    <tr key={report._id} className="border-t hover:bg-gray-100 transition duration-300">
      <td className="py-4 px-4">{report._id}</td>
      <td className="py-4 px-4">{report.user}</td>
      <td className="py-4 px-4">{new Date(report.date).toLocaleDateString()}</td>
      <td className="py-4 px-4">{report.metrics.caloriesBurned}</td>
      <td className="py-4 px-4">{report.activities.join(', ')}</td>
    </tr>
  ))}
</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
