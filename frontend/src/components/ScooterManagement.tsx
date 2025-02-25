import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2, Home, Settings, Bike, Package } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/scooterManagement.css';

// Types
type Scooter = {
  id: string;
  model: string;
  batteryCycles: number;
  lastMaintenanceDate: string;
};

const ScooterManagement = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [formData, setFormData] = useState({
    model: '',
    batteryCycles: 0,
    lastMaintenanceDate: '',
  });
  const [editingScooter, setEditingScooter] = useState<Scooter | null>(null);

  // Fetch scooters from the API
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

  // Form Handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingScooter) {
        await axios.put(`http://localhost:3001/scooters/${editingScooter.id}`, formData);
        toast.success('✅ Scooter modifié avec succès !');
        setEditingScooter(null);
      } else {
        await axios.post('http://localhost:3001/scooters', formData);
        toast.success('✅ Scooter ajouté avec succès !');
      }
      fetchScooters();
      setFormData({ model: '', batteryCycles: 0, lastMaintenanceDate: '' });
    } catch (error) {
      toast.error('❌ Une erreur est survenue.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/scooters/${id}`);
      toast.success('🗑️ Scooter supprimé avec succès !');
      fetchScooters();
    } catch (error) {
      toast.error('❌ Impossible de supprimer le scooter.');
    }
  };

  const handleEdit = (scooter: Scooter) => {
    setEditingScooter(scooter);
    setFormData({
      model: scooter.model,
      batteryCycles: scooter.batteryCycles,
      lastMaintenanceDate: scooter.lastMaintenanceDate.split('T')[0], // Format date pour le champ input
    });
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

      {/* Main Content */}
      <div className="scooter-management-container">
        <h1 className="page-title">🛠️ Gestion des Scooters</h1>

        {/* Formulaire d'ajout/modification */}
        <section className="scooter-form-section">
          <h2>{editingScooter ? '✏️ Modifier un scooter' : '➕ Ajouter un nouveau scooter'}</h2>
          <form onSubmit={handleSubmit} className="scooter-form">
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
              {editingScooter ? '✅ Modifier' : '➕ Ajouter'}
            </button>
          </form>
        </section>

        {/* Liste des scooters */}
        <section>
          <h2 className="list-title">📋 Liste des Scooters</h2>
          <div className="scooter-grid">
            {scooters.map((scooter) => (
              <div key={scooter.id} className="scooter-card">
                <div>
                  <h3 className="scooter-model">🚲 {scooter.model}</h3>
                  <p>Cycles: {scooter.batteryCycles}</p>
                  <p>Dernière maintenance: {new Date(scooter.lastMaintenanceDate).toLocaleDateString()}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(scooter)} className="edit-button">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(scooter.id)} className="delete-button">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
      </div>
    </div>
  );
};

export default ScooterManagement;
