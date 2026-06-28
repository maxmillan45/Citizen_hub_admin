import React, { useState, useEffect } from 'react';
import { FiUsers, FiFlag, FiHelpCircle, FiMessageSquare, FiDollarSign, FiBookOpen } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/dashboard/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard data');
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
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#BB0000', textAlign: 'center', padding: '40px' }}>
        <p>{error}</p>
        <button className="btn-secondary" onClick={fetchStats}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Admin Dashboard</h1>
      <p className="admin-page-subtitle">Overview of your Citizen Hub platform</p>

      <div className="admin-stats-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div className="stat-card" key={index}>
              <div className="stat-icon" style={{ background: `${card.color}15` }}>
                <Icon size={24} color={card.color} />
              </div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          );
        })}
      </div>

      {stats?.recent_activity && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#1a1a1a' }}>Recent Users</h3>
            {stats.recent_activity.new_users?.map((user, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span>{user.phone_number}</span>
                <span style={{ fontSize: '12px', color: '#666', marginLeft: '12px' }}>
                  {new Date(user.date_joined).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 style={{ marginBottom: '16px', fontSize: '16px', color: '#1a1a1a' }}>Recent Crime Reports</h3>
            {stats.recent_activity.recent_crimes?.map((crime, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span>{crime.category}</span>
                <span className="badge badge-info" style={{ marginLeft: '12px' }}>
                  {crime.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
