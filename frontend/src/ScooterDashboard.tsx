import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6; // 6 mois en millisecondes
    const lastMaintenance = new Date(scooter.lastMaintenanceDate).getTime();
    const now = Date.now();
    return (
      scooter.batteryCycles >= 50 ||
      now - lastMaintenance > sixMonths
    );
  };

  // Calcul des statistiques
  const totalScooters = scooters.length;
  const scootersNeedingMaintenance = scooters.filter(needsMaintenance);
  const averageBatteryCycles = totalScooters
    ? Math.round(
        scooters.reduce((acc, scooter) => acc + scooter.batteryCycles, 0) / totalScooters
      )
    : 0;
  const averageMaintenanceDelay = totalScooters
    ? Math.round(
        scooters.reduce((acc, scooter) => {
          const lastMaintenance = new Date(scooter.lastMaintenanceDate).getTime();
          const now = Date.now();
          return acc + (now - lastMaintenance);
        }, 0) /
          totalScooters /
          (1000 * 60 * 60 * 24) // Convertir en jours
      )
    : 0;

  // Gérer la recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Récupérer la liste des scooters depuis l'API
  const fetchScooters = async () => {
    try {
      const response = await axios.get<Scooter[]>('http://localhost:3001/scooters');
      setScooters(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des scooters :', error);
      toast.error('❌ Erreur lors de la récupération des scooters.');
    }
  };

  useEffect(() => {
    fetchScooters();
  }, []);

  // Gérer le formulaire de création
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/scooters', formData);
      fetchScooters(); // Rafraîchir la liste
      setFormData({ model: '', batteryCycles: 0, lastMaintenanceDate: '' });
      toast.success('✅ Scooter ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création du scooter :', error);
      toast.error('❌ Impossible d\'ajouter le scooter.');
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Suppression du scooter avec ID:', id);
    try {
      await axios.delete(`http://localhost:3001/scooters/${id}`);
      fetchScooters();
      toast.success('🗑️ Scooter supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression du scooter :', error);
      toast.error('❌ Impossible de supprimer le scooter.');
    }
  };

  const filteredScooters = scooters.filter((scooter) =>
    scooter.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Liste des Scooters</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-semibold">🚲 Total des Scooters</h3>
          <p className="text-2xl">{totalScooters}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h3 className="text-lg font-semibold">⚠️ Scooters en Maintenance</h3>
          <p className="text-2xl">{scootersNeedingMaintenance.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="text-lg font-semibold">🔋 Moyenne Cycles</h3>
          <p className="text-2xl">{averageBatteryCycles}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h3 className="text-lg font-semibold">📅 Maintenance Moyenne</h3>
          <p className="text-2xl">{averageMaintenanceDelay} jours</p>
        </div>
      </div>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher par modèle"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Liste des scooters nécessitant une maintenance */}
      <h2 className="text-xl font-semibold mb-2 text-red-500">⚠️ Scooters nécessitant une maintenance</h2>
      {!scootersNeedingMaintenance.length && (
        <p className="text-green-500">✅ Tous les scooters sont en bon état.</p>
      )}
      <ul className="mb-6">
        {scootersNeedingMaintenance.map((scooter) => (
          <li key={scooter.id} className="border p-2 rounded mb-2 bg-red-100 flex justify-between items-center">
            <div>
              🚲 <strong>{scooter.model}</strong> - Cycles: {scooter.batteryCycles} - Maintenance: {new Date(scooter.lastMaintenanceDate).toLocaleDateString()}
            </div>
            <button
              onClick={() => handleDelete(scooter.id)}
              className="bg-red-600 text-white p-2 rounded"
            >
              🗑️ Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire pour ajouter un scooter */}
      <h2 className="text-xl font-semibold mb-2">➕ Ajouter un nouveau scooter</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="model"
          placeholder="Modèle"
          value={formData.model}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="batteryCycles"
          placeholder="Cycles de batterie"
          value={formData.batteryCycles}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          name="lastMaintenanceDate"
          value={formData.lastMaintenanceDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          ➕ Ajouter
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default ScooterDashboard;