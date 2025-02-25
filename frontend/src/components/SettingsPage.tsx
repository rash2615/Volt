import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Bike, Package, Settings } from 'lucide-react';
import '../assets/settingsPage.css';

const SettingsPage = () => {
  // États pour les paramètres
  const [theme, setTheme] = useState('Clair');
  const [language, setLanguage] = useState('Français');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Effet pour appliquer le thème automatiquement
  useEffect(() => {
    document.body.className = theme === 'Sombre' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Gestion des changements de sélection
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Sauvegarder les paramètres (simulé ici avec console.log)
  const handleSave = () => {
    const settings = {
      theme,
      language,
      notificationsEnabled,
    };
    console.log('Paramètres sauvegardés :', settings);
    alert('💾 Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="settings-container">
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
          <Link to="/settings" className="nav-button active">
            <Settings size={18} /> Paramètres
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="settings-content">
        <h1 className="page-title">⚙️ Paramètres</h1>
        <p className="description">Configurez les options de votre application ici.</p>

        {/* Section de paramètres */}
        <section className="settings-section">
          <h2>🖥️ Interface</h2>
          <div className="setting-item">
            <label>Thème</label>
            <select className="input-select" value={theme} onChange={handleThemeChange}>
              <option>Clair</option>
              <option>Sombre</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Langue</label>
            <select className="input-select" value={language} onChange={handleLanguageChange}>
              <option>Français</option>
              <option>Anglais</option>
            </select>
          </div>
        </section>

        {/* Section de notifications */}
        <section className="settings-section">
          <h2>🔔 Notifications</h2>
          <div className="setting-item">
            <label>Activer les notifications</label>
            <input
              type="checkbox"
              className="toggle-switch"
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
            />
          </div>
        </section>

        {/* Bouton de sauvegarde */}
        <button className="save-button" onClick={handleSave}>
          💾 Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
