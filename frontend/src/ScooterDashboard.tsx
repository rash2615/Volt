import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Settings, Bike, Trash2, Package } from 'lucide-react';
import './scooterDashboard.css';
import { Link } from 'react-router-dom';

// Types
type Scooter = {
  id: string;
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
  const [searchTerm, setSearchTerm] = useState('');

  // Vérifier si un scooter a besoin de maintenance
  const needsMaintenance = (scooter: Scooter) => {
    const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;
    const lastMaintenance = new Date(scooter.lastMaintenanceDate).getTime();
    return scooter.batteryCycles >= 50 || Date.now() - lastMaintenance > sixMonths;
  };

  // Statistiques
  const totalScooters = scooters.length;
  const scootersNeedingMaintenance = scooters.filter(needsMaintenance);
  const averageBatteryCycles = totalScooters
    ? Math.round(scooters.reduce((acc, scooter) => acc + scooter.batteryCycles, 0) / totalScooters)
    : 0;
  const averageMaintenanceDelay = totalScooters
    ? Math.round(
        scooters.reduce((acc, scooter) => acc + (Date.now() - new Date(scooter.lastMaintenanceDate).getTime()), 0) /
          totalScooters /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // Récupérer la liste des scooters depuis l'API
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

  // Gestion du formulaire
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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/scooters/${id}`);
      fetchScooters();
      toast.success('🗑️ Scooter supprimé avec succès !');
    } catch (error) {
      toast.error('❌ Impossible de supprimer le scooter.');
    }
  };

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

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">📊 Tableau de bord des Scooters</h2>

        {/* Statistiques */}
        <div className="stats-grid">
          <StatCard label="Total Scooters" value={totalScooters} icon={<Bike />} bgColor="bg-blue" />
          <StatCard label="En Maintenance" value={scootersNeedingMaintenance.length} icon={<Settings />} bgColor="bg-red" />
          <StatCard label="Moyenne Cycles" value={averageBatteryCycles} icon={<Settings />} bgColor="bg-green" />
          <StatCard label="Maintenance Moyenne" value={`${averageMaintenanceDelay} jours`} icon={<Settings />} bgColor="bg-yellow" />
        </div>

        {/* Recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher par modèle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Liste des scooters nécessitant une maintenance */}
        <section className="scooters-list">
          <h3 className="maintenance-title">⚠️ Scooters nécessitant une maintenance</h3>
          <div className="scooter-grid">
            {scootersNeedingMaintenance.map((scooter) => (
              <div key={scooter.id} className="scooter-card">
                <div>
                  <h4 className="scooter-model">🚲 {scooter.model}</h4>
                  <p>Cycles: {scooter.batteryCycles}</p>
                  <p>Maintenance: {new Date(scooter.lastMaintenanceDate).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(scooter.id)}
                  className="delete-button"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
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

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
    </div>
  );
};

const StatCard = ({ label, value, icon, bgColor }: any) => (
  <div className={`stat-card ${bgColor}`}>
    <div className="icon">{icon}</div>
    <div>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  </div>
);

export default ScooterDashboard;
