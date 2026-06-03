import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState({
    occupancy: null,
    costs: null,
    waste: null,
    forecasts: []
  });
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [occupancy, costs, waste] = await Promise.all([
        axios.get(`${API_URL}/occupancy/average/30`, { headers }),
        axios.get(`${API_URL}/analytics/costs/daily?start_date=2026-05-04&end_date=2026-06-03`, { headers }),
        axios.get(`${API_URL}/analytics/waste?start_date=2026-05-04&end_date=2026-06-03`, { headers })
      ]);

      setData({
        occupancy: occupancy.data,
        costs: costs.data,
        waste: waste.data,
        forecasts: []
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard"><p>Carregando...</p></div>;

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>
      
      <div className="kpi-container">
        <div className="kpi-card">
          <h3>👥 Ocupação Média</h3>
          <p className="kpi-value">{data.occupancy?.average_occupancy || 0}</p>
          <p className="kpi-subtitle">hóspedes</p>
        </div>
        
        <div className="kpi-card">
          <h3>💰 Custo Diário Médio</h3>
          <p className="kpi-value">R$ {(data.costs?.[0]?.total_cost || 0).toFixed(2)}</p>
          <p className="kpi-subtitle">últimos 30 dias</p>
        </div>
        
        <div className="kpi-card">
          <h3>🗑️ Desperdício</h3>
          <p className="kpi-value">{(data.waste?.length || 0)}</p>
          <p className="kpi-subtitle">registros</p>
        </div>

        <div className="kpi-card">
          <h3>✅ Status</h3>
          <p className="kpi-value" style={{color: '#10b981'}}>Ativo</p>
          <p className="kpi-subtitle">Sistema operacional</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>📈 Custos Diários (Últimos 30 dias)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.costs || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_cost" stroke="#3b82f6" name="Custo Total" />
              <Line type="monotone" dataKey="waste_cost" stroke="#ef4444" name="Custo Desperdiçado" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>📊 Desperdício por Motivo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.waste || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="waste_reason" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_waste_cost" fill="#ef4444" name="Custo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
