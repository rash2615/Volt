import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Home, Bike, Settings, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/stockManagement.css';

// Types
type StockItem = {
  id: string;
  name: string;
  quantity: number;
  lastRestocked: string;
};

const StockManagement = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    lastRestocked: '',
  });
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  // Fetch stock data from the API
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

  // Form Handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:3001/stock/${editingItem.id}`, formData);
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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/stock/${id}`);
      toast.success('🗑️ Stock supprimé avec succès !');
      fetchStockItems();
    } catch (error) {
      toast.error('❌ Impossible de supprimer le stock.');
    }
  };

  const handleEdit = (item: StockItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity,
      lastRestocked: item.lastRestocked.split('T')[0], // Format pour input date
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
      <div className="stock-management-container">
        <h1 className="page-title">📦 Gestion des Stocks</h1>

        {/* Formulaire d'ajout/modification */}
        <section className="stock-form-section">
          <h2>{editingItem ? '✏️ Modifier un stock' : '➕ Ajouter un nouveau stock'}</h2>
          <form onSubmit={handleSubmit} className="stock-form">
            <input
              type="text"
              name="name"
              placeholder="Nom de l'article"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantité"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="lastRestocked"
              value={formData.lastRestocked}
              onChange={handleChange}
              required
            />
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
              <div key={item.id} className="stock-card">
                <div>
                  <h3 className="stock-item-name">📦 {item.name}</h3>
                  <p>Quantité : {item.quantity}</p>
                  <p>Dernier réapprovisionnement : {new Date(item.lastRestocked).toLocaleDateString()}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(item)} className="edit-button">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">
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
