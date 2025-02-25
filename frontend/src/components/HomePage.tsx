import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>🚀 Bienvenue sur VoltRide</h1>
      <Link to="/dashboard" className="start-button">
        Accéder au Dashboard
      </Link>
    </div>
  );
};

export default HomePage;
