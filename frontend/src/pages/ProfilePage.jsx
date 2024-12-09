// ProfilePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentMethod: "",
    transactionId: "",
  });
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch user data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setIsLoading(false);
        console.log("Fetched user data:", response.data); // Debug log
      } catch (error) {
        console.error("Error fetching profile data:", error);
        navigate("/login"); // Redirect to login if profile data fetch fails
      }
    };

    fetchProfile();
  }, [navigate]);

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.post("/api/users/payment", {
        userId: userData._id,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        status: "success",
        type: "payment"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Payment created successfully:", response.data);
      setPaymentData({
        amount: "",
        paymentMethod: "",
        transactionId: "",
      });
      setPaymentError("");
    } catch (error) {
      console.error("Error creating payment:", error);
      setPaymentError("Failed to create payment. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("User data in ProfilePage:", userData); // Debug log

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <div className="mt-4">
        <h3 className="font-bold">Name:</h3>
        <p>{userData.name}</p>
        <h3 className="font-bold mt-2">Email:</h3>
        <p>{userData.email}</p>
        <h3 className="font-bold mt-2">Age:</h3>
        <p>{userData.profileDetails?.age}</p>
        <h3 className="font-bold mt-2">Gender:</h3>
        <p>{userData.profileDetails?.gender}</p>
        <h3 className="font-bold mt-2">Health Goals:</h3>
        <p>{userData.profileDetails?.healthGoals}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Make a Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={paymentData.amount}
              onChange={handlePaymentChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handlePaymentChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="bank">Bank Transfer</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">Jazzcash</option>
              <option value="sadapay">Sadapay</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={paymentData.transactionId}
              onChange={handlePaymentChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Make Payment
          </button>
          {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
