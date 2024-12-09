import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    healthGoals: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/profile`);
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          age: response.data.profileDetails.age || "",
          gender: response.data.profileDetails.gender || "",
          healthGoals: response.data.profileDetails.healthGoals || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/users/${userId}/profile`, formData);
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {isEditing ? (
        <div>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="block mb-2">
            Health Goals:
            <input
              type="text"
              name="healthGoals"
              value={formData.healthGoals}
              onChange={handleInputChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Age:</strong> {profile.profileDetails.age || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {profile.profileDetails.gender || "N/A"}
          </p>
          <p>
            <strong>Health Goals:</strong> {profile.profileDetails.healthGoals || "N/A"}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
