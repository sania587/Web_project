import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ReportComponent = () => {
  const [userProgress, setUserProgress] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports/user-progress");
        const data = response.data;
        setUserProgress(data);
      } catch (err) {
        setError("Failed to fetch user progress data.");
      }
    };
    fetchUserProgress();
  }, []);

  // Calculate average metrics
  const calculateAverageMetrics = () => {
    if (userProgress.length === 0) return { avgCaloriesBurned: 0, avgStepsTaken: 0, avgDistanceCovered: 0 };

    const totalMetrics = userProgress.reduce(
      (acc, report) => {
        acc.caloriesBurned += report.metrics.caloriesBurned;
        acc.stepsTaken += report.metrics.stepsTaken;
        acc.distanceCovered += report.metrics.distanceCovered;
        return acc;
      },
      { caloriesBurned: 0, stepsTaken: 0, distanceCovered: 0 }
    );

    return {
      avgCaloriesBurned: totalMetrics.caloriesBurned / userProgress.length,
      avgStepsTaken: totalMetrics.stepsTaken / userProgress.length,
      avgDistanceCovered: totalMetrics.distanceCovered / userProgress.length,
    };
  };

  const averageMetrics = calculateAverageMetrics();

  // Chart data for Bar and Pie
  const chartData = {
    labels: ["Calories Burned", "Steps Taken", "Distance Covered"],
    datasets: [
      {
        label: "Average Metrics",
        data: [
          averageMetrics.avgCaloriesBurned,
          averageMetrics.avgStepsTaken,
          averageMetrics.avgDistanceCovered,
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="w-full p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">User Progress Report</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/3"
          />
          <div className="text-lg text-gray-600">Total Records: {userProgress.length}</div>
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
                  <th className="py-3 px-4 text-left">User ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Calories Burned</th>
                  <th className="py-3 px-4 text-left">Activities</th>
                </tr>
              </thead>
              <tbody>
                {userProgress
                  .filter((report) =>
                    report && report.user && report.user.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((report) => (
                    <tr key={report._id} className="border-t hover:bg-gray-100 transition duration-300">
                      <td className="py-4 px-4">{report._id}</td>
                      <td className="py-4 px-4">{report.user}</td>
                      <td className="py-4 px-4">{new Date(report.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4">{report.metrics.caloriesBurned}</td>
                      <td className="py-4 px-4">{report.activities.join(", ")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-4xl font-bold text-center mb-4">Average Metrics Charts</h2>
          <div className="flex justify-center items-center space-x-8">
            {/* Bar Chart */}
            <div style={{ width: "45%", height: "400px" }}>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        font: { size: 14, weight: "normal" },
                      },
                    },
                  },
                  scales: {
                    x: { ticks: { font: { size: 12, weight: "normal" } } },
                    y: { ticks: { font: { size: 12, weight: "normal" } } },
                  },
                }}
              />
            </div>

            {/* Pie Chart */}
            <div style={{ width: "45%", height: "400px" }}>
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: { size: 14, weight: "normal" },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
