import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Settings, Bike, Trash2, Package } from 'lucide-react';
import '../assets/scooterDashboard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ✅ Types
type Scooter = {
  _id: string;
  model: string;
  batteryCycles: number;
  lastMaintenanceDate: string;
};

const ScooterDashboard = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [formData, setFormData] = useState({
    model: '',
    batteryCycles: 0,
    lastMaintenanceDate: '',
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 Récupération des notifications de stock faible
  const fetchNotifications = async () => {
    try {
      const response = await axios.get<string[]>(
        'http://localhost:3001/stock/notifications'
      );
      const newNotifications = response.data;
      if (newNotifications.length) {
        newNotifications.forEach((notif) => {
          toast.warn(`⚠️ ${notif}`);
        });
        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des notifications');
    }
  };

  // 🔄 Récupération des scooters
  const fetchScooters = async () => {
    try {
      const response = await axios.get<Scooter[]>(
        'http://localhost:3001/scooters'
      );
      setScooters(response.data);
    } catch (error) {
      toast.error('❌ Erreur lors de la récupération des scooters.');
    }
  };

  // 🔁 Rafraîchissement automatique
  useEffect(() => {
    fetchScooters();
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // ➡️ Rafraîchit toutes les 10 secondes

    return () => clearInterval(interval);
  }, []);

  // 📊 Calcul des statistiques
  const totalScooters = scooters.length;
  const scootersNeedingMaintenance = scooters.filter(
    (scooter) =>
      scooter.batteryCycles >= 50 ||
      Date.now() - new Date(scooter.lastMaintenanceDate).getTime() >
        1000 * 60 * 60 * 24 * 30 * 6
  );

  const averageBatteryCycles = totalScooters
    ? Math.round(
        scooters.reduce((acc, scooter) => acc + scooter.batteryCycles, 0) /
          totalScooters
      )
    : 0;

  const averageMaintenanceDelay = totalScooters
    ? Math.round(
        scooters.reduce(
          (acc, scooter) =>
            acc +
            (Date.now() -
              new Date(scooter.lastMaintenanceDate).getTime()),
          0
        ) /
          totalScooters /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // ➕ Gestion du formulaire d'ajout
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3001/scooters/${_id}`);
      fetchScooters();
      toast.success('🗑️ Scooter supprimé avec succès !');
    } catch (error) {
      toast.error('❌ Impossible de supprimer le scooter.');
    }
  };

  // 🔍 Filtrage en temps réel
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

      {/* 📊 Dashboard Content */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">📊 Tableau de bord des Scooters</h2>

        {/* ➡️ Statistiques */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            label="Total Scooters"
            value={totalScooters}
            icon={<Bike />}
            bgColor="bg-blue"
          />
          <StatCard
            label="En Maintenance"
            value={scootersNeedingMaintenance.length}
            icon={<Settings />}
            bgColor="bg-red"
          />
          <StatCard
            label="Moyenne Cycles"
            value={averageBatteryCycles}
            icon={<Settings />}
            bgColor="bg-green"
          />
          <StatCard
            label="Maintenance Moyenne"
            value={`${averageMaintenanceDelay} jours`}
            icon={<Settings />}
            bgColor="bg-yellow"
          />
        </motion.div>

        {/* 🔍 Recherche */}
        <motion.input
          type="text"
          placeholder="🔍 Rechercher par modèle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* 🚲 Liste des scooters */}
        <section className="scooters-list">
          <h3 className="maintenance-title">
            ⚠️ Scooters nécessitant une maintenance
          </h3>
          <motion.div className="scooter-grid">
            {filteredScooters.map((scooter) => (
              <div key={scooter._id} className="scooter-card">
                <div>
                  <h4 className="scooter-model">🚲 {scooter.model}</h4>
                  <p>Cycles: {scooter.batteryCycles}</p>
                  <p>
                    Maintenance:{' '}
                    {new Date(
                      scooter.lastMaintenanceDate
                    ).toLocaleDateString()}
                  </p>
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

        {/* ➕ Formulaire d'ajout */}
        <section className="add-scooter-form">
          <h3>➕ Ajouter un nouveau scooter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="model"
              placeholder="Modèle"
              value={formData.model}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="batteryCycles"
              placeholder="Cycles de batterie"
              value={formData.batteryCycles}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="lastMaintenanceDate"
              value={formData.lastMaintenanceDate}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-button">
              ➕ Ajouter le scooter
            </button>
          </form>
        </section>
      </div>

      {/* 🔔 Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
    </div>
  );
};

// 📊 Carte de statistiques
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
