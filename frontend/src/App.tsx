import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScooterDashboard from './components/ScooterDashboard';
import StockManagement from './components/StockManagement';
import SettingsPage from './components/SettingsPage';
import ScooterManagement from './components/ScooterManagement';
import HomePage from './components/HomePage';

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
