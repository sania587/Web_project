import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import dispatch hook
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, resetPassword } from "../../redux/slices/authSlice"; // Redux actions

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email } = location.state;
      const otpResult = await dispatch(verifyOtp({ email, otp }));

      if (verifyOtp.fulfilled.match(otpResult)) {
        // OTP verified, now reset password
        const resetResult = await dispatch(resetPassword({ email, newPassword }));
        if (resetPassword.fulfilled.match(resetResult)) {
          alert("Password reset successfully!");
          navigate("/login");
        } else {
          alert("Failed to reset password.");
        }
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Verify OTP and Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="otp" className="text-sm font-medium text-gray-600">
            Enter OTP
          </label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="newPassword" className="text-sm font-medium text-gray-600">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
