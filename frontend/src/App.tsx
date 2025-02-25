import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScooterDashboard from './ScooterDashboard';
import StockManagement from './StockManagement';
import SettingsPage from './SettingsPage';
import ScooterManagement from './ScooterManagement';
import HomePage from './HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ScooterDashboard />} />
        <Route path="/scooters" element={<ScooterManagement />} />
        <Route path="/stock" element={<StockManagement />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
