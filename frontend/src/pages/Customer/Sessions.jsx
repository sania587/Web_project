import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

const Sessions = ({ userId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/sessions/user/${userId}`);
        setSessions(response.data.sessions); // Assuming sessions are in this format
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  const handleSessionStatusChange = async (sessionId, status) => {
    try {
      await axios.put(`/api/sessions/${sessionId}`, { status });
      // Re-fetch the sessions or update the state directly after changing status
      setSessions(prevSessions =>
        prevSessions.map(session =>
          session._id === sessionId ? { ...session, status } : session
        )
      );
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sessions</h2>
      {sessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session._id} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{session.trainerId.name}</h3>
                  <p className="text-sm text-gray-600">{new Date(session.date).toLocaleString()}</p>
                </div>
                <div>
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
              </div>
              {session.status === 'requested' && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleSessionStatusChange(session._id, 'approved')}
                    className="py-2 px-4 bg-green-500 text-white rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleSessionStatusChange(session._id, 'rejected')}
                    className="py-2 px-4 bg-red-500 text-white rounded-md"
                  >
                    Reject
                  </button>
                </div>
              )}
              {session.status === 'approved' && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleSessionStatusChange(session._id, 'completed')}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sessions;
