import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRoutes from './routes/CustomerRoutes';  // Importing only CustomerRoutes
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Add global layout or navigation here if needed */}

        <Routes>
          {/* Define routes for Customer Panel only */}
          <Route path="/customers/*" element={<CustomerRoutes />} />

          {/* Default route */}
          <Route path="/" element={<div>Welcome to the Fitness Website!</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
