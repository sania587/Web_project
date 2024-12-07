import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AssignedPlans from "../../components/Customer/Dashboard/AssignedPlans";
import TrainersList from "../../components/Customer/Dashboard/TrainersList";
import ProgressReports from "../../components/Customer/Dashboard/ProgressReports";

const Dashboard = () => {
  const [plans, setPlans] = useState({});
  const [progressReports, setProgressReports] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch workout and diet plans
    axios.get("/api/dashboard/plans").then((res) => setPlans(res.data)).catch(console.error);

    // Fetch progress reports
    axios.get("/api/dashboard/progress").then((res) => setProgressReports(res.data)).catch(console.error);

    // Fetch trainers list
    axios.get("/api/dashboard/trainers").then((res) => setTrainers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Main Content: Plans & Progress Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assigned Plans Section */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <AssignedPlans plans={plans} />
        </div>

        {/* Progress Reports Section */}
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <ProgressReports reports={progressReports} />
        </div>
      </div>

      {/* Trainers List Section */}
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
        <TrainersList trainers={trainers} />
      </div>
    </div>
  );
};

export default Dashboard;
