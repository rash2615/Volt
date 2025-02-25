import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Settings, Bike, Trash2, Package } from 'lucide-react';
import '../assets/scooterDashboard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scooter } from '../types/Scooter';

const ScooterDashboard = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [formData, setFormData] = useState({
    model: '',
    batteryCycles: 0,
    lastMaintenanceDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer la liste des scooters
  const fetchScooters = async () => {
    try {
      const response = await axios.get<Scooter[]>('http://localhost:3001/scooters');
      setScooters(response.data);
    } catch (error) {
      toast.error('❌ Erreur lors de la récupération des scooters.');
    }
  };

  useEffect(() => {
    fetchScooters();
  }, []);

  // Ajouter un scooter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/scooters', formData);
      fetchScooters();
      setFormData({ model: '', batteryCycles: 0, lastMaintenanceDate: '' });
      toast.success('✅ Scooter ajouté avec succès !');
    } catch (error) {
      toast.error('❌ Impossible d\'ajouter le scooter.');
    }
  };

  // Supprimer un scooter
  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3001/scooters/${_id}`);
      fetchScooters();
      toast.success('🗑️ Scooter supprimé avec succès !');
    } catch (error) {
      toast.error('❌ Impossible de supprimer le scooter.');
    }
  };

  // Filtrage des scooters
  const filteredScooters = scooters.filter((scooter) =>
    scooter.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="brand">VoltRide</h1>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-button">
            <Home size={18} /> Dashboard
          </Link>
          <Link to="/scooters" className="nav-button">
            <Bike size={18} /> Scooters
          </Link>
          <Link to="/stock" className="nav-button">
            <Package size={18} /> Gestion des Stocks
          </Link>
          <Link to="/settings" className="nav-button">
            <Settings size={18} /> Paramètres
          </Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">📊 Tableau de bord des Scooters</h2>

        {/* Statistiques */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard label="Total Scooters" value={scooters.length} icon={<Bike />} bgColor="bg-blue" />
          <StatCard label="En Maintenance" value={scooters.filter(scooter => scooter.batteryCycles >= 50).length} icon={<Settings />} bgColor="bg-red" />
        </motion.div>

        {/* Barre de recherche */}
        <motion.input
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          type="text"
          placeholder="🔍 Rechercher par modèle..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Liste des scooters */}
        <section className="scooters-list">
          <h3 className="maintenance-title">🛴 Liste des Scooters</h3>
          <motion.div
            className="scooter-grid"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {filteredScooters.map((scooter) => (
              <div key={scooter._id} className="scooter-card">
                <div>
                  <h4 className="scooter-model">🚲 {scooter.model}</h4>
                  <p>Cycles: {scooter.batteryCycles}</p>
                  <p>Maintenance: {new Date(scooter.lastMaintenanceDate).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(scooter._id)}
                  className="delete-button"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Formulaire d'ajout */}
        <section className="add-scooter-form">
          <h3>➕ Ajouter un nouveau scooter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="model"
              placeholder="Modèle"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
            <input
              type="number"
              name="batteryCycles"
              placeholder="Cycles de batterie"
              value={formData.batteryCycles}
              onChange={(e) => setFormData({ ...formData, batteryCycles: Number(e.target.value) })}
              required
            />
            <input
              type="date"
              name="lastMaintenanceDate"
              value={formData.lastMaintenanceDate}
              onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
              required
            />
            <button type="submit" className="submit-button">
              ➕ Ajouter le scooter
            </button>
          </form>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
    </div>
  );
};

// Carte de statistiques animée
const StatCard = ({ label, value, icon, bgColor }: any) => (
  <motion.div
    className={`stat-card ${bgColor}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="icon">{icon}</div>
    <div>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  </motion.div>
);

export default ScooterDashboard;
