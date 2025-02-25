import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Settings, Package, Edit, Trash2, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../assets/stockManagement.css';

// Types
interface StockItem {
  _id: string;
  name: string;
  quantity: number;
  lastRestocked: string;
}

const StockManagement = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [formData, setFormData] = useState({ name: '', quantity: 0, lastRestocked: '' });
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  // Récupérer la liste des stocks
  const fetchStockItems = async () => {
    try {
      const response = await axios.get<StockItem[]>('http://localhost:3001/stock');
      setStockItems(response.data);
    } catch (error) {
      toast.error('❌ Erreur lors de la récupération des stocks.');
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  // Gestion du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:3001/stock/${editingItem._id}`, formData);
        toast.success('✅ Stock modifié avec succès !');
        setEditingItem(null);
      } else {
        await axios.post('http://localhost:3001/stock', formData);
        toast.success('✅ Stock ajouté avec succès !');
      }
      fetchStockItems();
      setFormData({ name: '', quantity: 0, lastRestocked: '' });
    } catch (error) {
      toast.error('❌ Une erreur est survenue.');
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3001/stock/${_id}`);
      toast.success('🗑️ Stock supprimé avec succès !');
      fetchStockItems();
    } catch (error) {
      toast.error('❌ Impossible de supprimer le stock.');
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
          <Link to="/stock" className="nav-button active">
            <Package size={18} /> Gestion des Stocks
          </Link>
          <Link to="/settings" className="nav-button">
            <Settings size={18} /> Paramètres
          </Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="stock-management-container">
        <h1 className="page-title">📦 Gestion des Stocks</h1>

        {/* Formulaire d'ajout/modification */}
        <section className="stock-form-section">
          <h2>{editingItem ? '✏️ Modifier un stock' : '➕ Ajouter un nouveau stock'}</h2>
          <form onSubmit={handleSubmit} className="stock-form">
            <input type="text" name="name" placeholder="Nom de l'article" value={formData.name} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantité" value={formData.quantity} onChange={handleChange} required />
            <input type="date" name="lastRestocked" value={formData.lastRestocked} onChange={handleChange} required />
            <button type="submit" className="submit-button">
              {editingItem ? '✅ Modifier' : '➕ Ajouter'}
            </button>
          </form>
        </section>

        {/* Liste des stocks */}
        <section>
          <h2 className="list-title">📋 Liste des Stocks</h2>
          <div className="stock-grid">
            {stockItems.map((item) => (
              <div key={item._id} className="stock-card">
                <div>
                  <h3 className="stock-item-name">📦 {item.name}</h3>
                  <p>Quantité : {item.quantity}</p>
                  <p>Dernier réapprovisionnement : {new Date(item.lastRestocked).toLocaleDateString()}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => setEditingItem(item)} className="edit-button">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="delete-button">
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

export default StockManagement;
