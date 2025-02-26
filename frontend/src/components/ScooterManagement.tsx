import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Settings, Bike, Trash2, Package, Edit } from 'lucide-react';
import '../assets/scooterDashboard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Types
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
  const [editingScooter, setEditingScooter] = useState<Scooter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      if (editingScooter) {
        await axios.put(`http://localhost:3001/scooters/${editingScooter._id}`, formData);
        toast.success('✅ Scooter mis à jour avec succès !');
        setEditingScooter(null);
      } else {
        await axios.post('http://localhost:3001/scooters', formData);
        toast.success('✅ Scooter ajouté avec succès !');
      }
      fetchScooters();
      setFormData({ model: '', batteryCycles: 0, lastMaintenanceDate: '' });
    } catch (error) {
      toast.error('❌ Erreur lors de l\'opération.');
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

  const handleEdit = (scooter: Scooter) => {
    setEditingScooter(scooter);
    setFormData({
      model: scooter.model,
      batteryCycles: scooter.batteryCycles,
      lastMaintenanceDate: scooter.lastMaintenanceDate.split('T')[0],
    });
  };

  // Filtrage des scooters selon le champ de recherche
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

      {/* Formulaire d'ajout / modification */}
      <section className="add-scooter-form">
        <h3>{editingScooter ? '✏️ Modifier un scooter' : '➕ Ajouter un nouveau scooter'}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="model" placeholder="Modèle" value={formData.model} onChange={handleChange} required />
          <input type="number" name="batteryCycles" placeholder="Cycles de batterie" value={formData.batteryCycles} onChange={handleChange} required />
          <input type="date" name="lastMaintenanceDate" value={formData.lastMaintenanceDate} onChange={handleChange} required />
          <button type="submit" className="submit-button">
            {editingScooter ? '✅ Modifier' : '➕ Ajouter'}
          </button>
        </form>
      </section>

      

      {/* Liste des scooters */}
      <section className="scooters-list">
        <h3>📋 Liste des scooters</h3>
        <div className="scooter-grid">
          {filteredScooters.map((scooter) => (
            <div key={scooter._id} className="scooter-card">
              <h4>🚲 {scooter.model}</h4>
              <p>Cycles: {scooter.batteryCycles}</p>
              <p>Maintenance: {new Date(scooter.lastMaintenanceDate).toLocaleDateString()}</p>
              <button onClick={() => handleEdit(scooter)} className="edit-button">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(scooter._id)} className="delete-button">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
    </div>
  );
};

export default ScooterDashboard;
