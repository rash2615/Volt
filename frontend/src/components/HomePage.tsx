import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/homePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">⚡ VoltRide - L’avenir de la mobilité urbaine</h1>
        <p className="hero-subtitle">Une gestion centralisée et intelligente de votre flotte de scooters électriques.</p>

        {/* Bouton animé */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/dashboard" className="start-button">
            🚀 Accéder au Dashboard
          </Link>
        </motion.div>
      </motion.div>

      {/* 🎂 Anniversaire de Rashmi */}
      <motion.div
        className="birthday-section"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="birthday-title">🎉 Joyeux Anniversaire Rashmi ! 🎂</h2>
        <p className="birthday-message">Aujourd’hui est un jour spécial et mérite un point bonus 🎁.</p>
      </motion.div>
    </div>
  );
};

export default HomePage;
