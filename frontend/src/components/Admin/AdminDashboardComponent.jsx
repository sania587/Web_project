import React, { useEffect, useState } from "react"; 
import AdminNav from "./AdminNav"; 
import { FaUser , FaChalkboardTeacher, FaComments } from "react-icons/fa"; 

const AdminDashboardComponent = () => {
  const [userCount, setUserCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Fetch counts from backend
  const fetchCounts = async () => {
    try {
      // Fetch user count
      const userResponse = await fetch("http://localhost:5000/api/counts/user-count");
      if (!userResponse.ok) throw new Error("Failed to fetch user count");
      const userData = await userResponse.json();
      setUserCount(userData.userCount);

      // Fetch trainer count
      const trainerResponse = await fetch("http://localhost:5000/api/counts/trainer-count");
      if (!trainerResponse.ok) throw new Error("Failed to fetch trainer count");
      const trainerData = await trainerResponse.json();
      setTrainerCount(trainerData.trainerCount);

      // Fetch feedback count
      const feedbackResponse = await fetch("http://localhost:5000/api/counts/feedback-count");
      if (!feedbackResponse.ok) throw new Error("Failed to fetch feedback count");
      const feedbackData = await feedbackResponse.json();
      setFeedbackCount(feedbackData.feedbackCount);
      
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <AdminNav />

      {/* Main Content */}
      <div className="p-8 text-white">
        {/* Statistics Section */}
        <div className="flex mb-5 justify-center items-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <FaUser  className="text-4xl text-orange-500 mx-auto" />
              <h2 className="font-bold text-xl mt-4">Number of Users</h2>
              <p className="text-2xl mt-2">{userCount}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <FaChalkboardTeacher className="text-4xl text-orange-500 mx-auto" />
              <h2 className="font-bold text-xl mt-4">Number of Trainers</h2>
              <p className="text-2xl mt-2">{trainerCount}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <FaComments className="text-4xl text-orange-500 mx-auto" />
              <h2 className="font-bold text-xl mt-4">Total Feedback</h2>
              <p className="text-2xl mt-2">{feedbackCount}</p>
            </div>
          </div>
        </div>

        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default AdminDashboardComponent;