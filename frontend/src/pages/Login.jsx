import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await axios.post(`${API_URL}${endpoint}`, formData);
      
      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro na operação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📊 Sistema de Controle de Estoques</h1>
        <p className="subtitle">Gerenciar Alimentos e Bebidas</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              disabled={loading}
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Login' : 'Registrar'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? 'Sem conta? ' : 'Tem conta? '}
          <button type="button" onClick={() => setIsLogin(!isLogin)} disabled={loading}>
            {isLogin ? 'Registre-se' : 'Faça login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
