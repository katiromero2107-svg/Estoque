import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>📊 Estoque</h1>
        <p className="version">v1.0.0</p>
      </div>

      <div className="user-info">
        <div className="user-avatar">👤</div>
        <div>
          <p className="user-name">{user.name}</p>
          <p className="user-role">{user.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">📈 Dashboard</Link>
        <Link to="/occupancy" className="nav-item">🏨 Ocupação</Link>
        <Link to="/inventory" className="nav-item">📦 Estoque</Link>
        <Link to="/forecasting" className="nav-item">🔮 Previsões</Link>
        <Link to="/consumption" className="nav-item">📝 Consumo</Link>
        <Link to="/analytics" className="nav-item">💰 Análise</Link>
        <Link to="/reports" className="nav-item">📄 Relatórios</Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Sair
      </button>
    </aside>
  );
}

export default Sidebar;
