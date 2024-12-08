import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios"; // Make sure axios is installed

const Navbar = ({ isAuthenticated, handleLogout, userId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  // Fetch notifications and sessions
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/notifications`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/sessions/user/${userId}`);
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    if (isAuthenticated) {
      fetchNotifications();
      fetchSessions();
    }
  }, [isAuthenticated, userId]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-400">
          FitHum
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
          </li>
          {isAuthenticated && (
            <>
              {/* Notifications Link */}
              <li>
                <Link
                  to="/notifications"
                  className="hover:text-green-400"
                >
                  Notifications
                </Link>
              </li>

              {/* Sessions Link */}
              <li>
                <Link
                  to="/sessions"
                  className="hover:text-green-400"
                >
                  Sessions
                </Link>
              </li>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="hover:text-green-400"
                >
                  <span className="material-icons">notifications</span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-md shadow-md">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {notifications.length === 0 ? (
                      <p>No new notifications.</p>
                    ) : (
                      <ul className="space-y-2">
                        {notifications.map((notification, index) => (
                          <li key={index} className="p-2 bg-gray-100 rounded-md">
                            <p className="text-gray-700">{notification}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Sessions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSessions(!showSessions)}
                  className="hover:text-green-400"
                >
                  <span className="material-icons">event_note</span>
                </button>
                {showSessions && (
                  <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-md shadow-md">
                    <h3 className="font-semibold text-lg">Sessions</h3>
                    {sessions.length === 0 ? (
                      <p>No upcoming sessions.</p>
                    ) : (
                      <ul className="space-y-2">
                        {sessions.map((session) => (
                          <li key={session._id} className="p-2 bg-gray-100 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-semibold">{session.trainerId.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(session.date).toLocaleString()}
                                </p>
                              </div>
                              <span
                                className={`inline-block px-3 py-1 text-sm rounded-md ${
                                  session.status === 'approved'
                                    ? 'bg-green-500 text-white'
                                    : session.status === 'requested'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-red-500 text-white'
                                }`}
                              >
                                {session.status}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/login");
                }}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/ask-role" className="hover:text-green-400">
               
               
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-green-400 text-xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-gray-700 text-center py-4">
          <li className="py-2">
            <Link to="/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="py-2">
                <Link to="/notifications" className="hover:text-green-400">
                  Notifications
                </Link>
              </li>
              <li className="py-2">
                <Link to="/sessions" className="hover:text-green-400">
                  Sessions
                </Link>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <li className="py-2">
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/login");
                }}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="py-2">
                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>
              </li>
              <li className="py-2">
                <Link to="/signup" className="hover:text-green-400">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
