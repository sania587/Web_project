import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressReports = () => {
  const [progressReports, setProgressReports] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    const fetchProgressReports = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/progress');
        
        // Ensure the data is an array before setting it
        if (Array.isArray(data)) {
          setProgressReports(data);
        } else {
          setProgressReports([]);  // Fallback to empty array if not an array
        }
      } catch (error) {
        console.error('Error fetching progress reports:', error);
        setError('Failed to fetch progress reports.');
        setProgressReports([]);  // Fallback to empty array
      } finally {
        setLoading(false);  // Stop loading after data fetch
      }
    };

    fetchProgressReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Progress Reports</h2>

      {loading ? (
        <p className="text-xl text-gray-500">Loading...</p>  // Show loading text while fetching data
      ) : error ? (
        <p className="text-xl text-red-600">{error}</p>  // Show error message if any
      ) : (
        <ul className="space-y-4">
          {progressReports.length > 0 ? (
            progressReports.map((report, index) => (
              <li key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                <p className="text-lg font-semibold text-gray-800"><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mt-2"><strong>Details:</strong> {report.details}</p>
              </li>
            ))
          ) : (
            <p className="text-xl text-gray-600">No progress reports available.</p>  // Show message if no reports found
          )}
        </ul>
      )}
    </div>
  );
};

export default ProgressReports;
