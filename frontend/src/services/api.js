import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw new Error("Failed to send OTP");
  }
};

export const getSubscriptionDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/subscription`);
    return response.data.subscription;
  } catch (error) {
    throw new Error("Failed to fetch subscription details");
  }
};
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust this to match your backend URL
});

export default api;
