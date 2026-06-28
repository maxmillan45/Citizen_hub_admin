import React, { useState, useEffect } from 'react';
import { FiUsers, FiFlag, FiHelpCircle, FiMessageSquare, FiDollarSign, FiBookOpen } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'https://citizen-hub-kenya-backend.onrender.com';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('Token:', token);
      
      const response = await fetch(`${API_URL}/api/auth/admin-panel/dashboard/`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dashboard data:', data);
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { icon: FiUsers, label: 'Total Users', value: stats.users?.total || 0, color: '#006B3F' },
    { icon: FiFlag, label: 'Crime Reports', value: stats.crime_reports?.total || 0, color: '#BB0000' },
    { icon: FiHelpCircle, label: 'FAQs', value: stats.faqs?.total || 0, color: '#1a1a1a' },
    { icon: FiMessageSquare, label: 'Chat Conversations', value: stats.chatbot?.total_conversations || 0, color: '#D4A017' },
    { icon: FiDollarSign, label: 'M-Pesa Payments', value: stats.payments?.total || 0, color: '#006B3F' },
    { icon: FiBookOpen, label: 'Constitution Articles', value: stats.constitution?.total_articles || 0, color: '#BB0000' },
  ] : [];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <div className="spinner"></div>
        <p style={{ marginLeft: '16px' }}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#BB0000', textAlign: 'center', padding: '40px' }}>
        <p>Error: {error}</p>
        <button className="btn-secondary" onClick={fetchStats}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Overview of your Citizen Hub platform</p>

      <div className="admin-stats-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div className="stat-card" key={index}>
              <div className="stat-icon" style={{ background: `${card.color}15`, padding: '8px', borderRadius: '8px', display: 'inline-block', marginBottom: '8px' }}>
                <Icon size={24} color={card.color} />
              </div>
              <div className="stat-value" style={{ color: card.color }}>{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
