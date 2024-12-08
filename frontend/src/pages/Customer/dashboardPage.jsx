import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AssignedPlans from "../../components/Customer/Dashboard/AssignedPlans";
import TrainersList from "../../components/Customer/Dashboard/TrainersList";
import ProgressReports from "../../components/Customer/Dashboard/ProgressReports";
import SubscriptionDetails from "../../pages/Customer/SubscriptionDetails";

const Dashboard = () => {
  const [plans, setPlans] = useState({});
  const [progressReports, setProgressReports] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    // Fetch workout and diet plans
    axios.get("/api/dashboard/plans").then((res) => setPlans(res.data)).catch(console.error);

    // Fetch progress reports
    axios.get("/api/dashboard/progress").then((res) => setProgressReports(res.data)).catch(console.error);

    // Fetch trainers list
    axios.get("/api/dashboard/trainers").then((res) => setTrainers(res.data)).catch(console.error);

    // Fetch subscription details for unauthorized users
    if (!userId) {
      axios.get("/api/users/subscription").then((res) => setSubscription(res.data.subscription)).catch((err) => setError(err.message)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

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

      {/* Subscription Details Section for Unauthorized Users */}
      {loading ? (
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
          <p>Error: {error}</p>
        </div>
      ) : !userId && subscription ? (
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
          <SubscriptionDetails subscription={subscription} />
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
