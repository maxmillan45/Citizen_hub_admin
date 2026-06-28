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
    { icon: FiFlag, label: 'Crime Reports', value: stats.crime_reports?.total || 0, color: '#dc3545' },
    { icon: FiHelpCircle, label: 'FAQs', value: stats.faqs?.total || 0, color: '#17a2b8' },
    { icon: FiMessageSquare, label: 'Chat Conversations', value: stats.chatbot?.total_conversations || 0, color: '#6f42c1' },
    { icon: FiDollarSign, label: 'M-Pesa Payments', value: stats.payments?.total || 0, color: '#28a745' },
    { icon: FiBookOpen, label: 'Constitution Articles', value: stats.constitution?.total_articles || 0, color: '#fd7e14' },
  ] : [];

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Admin Dashboard</h1>
      <p style={{ color: '#6c757d', marginBottom: '24px' }}>Overview of your Citizen Hub platform</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: `${card.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={20} color={card.color} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{card.value}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#6c757d' }}>{card.label}</span>
            </div>
          );
        })}
      </div>

      {stats?.recent_activity && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Recent Users</h3>
            {stats.recent_activity.new_users?.map((user, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>{user.phone_number}</span>
                <span style={{ fontSize: '12px', color: '#6c757d', marginLeft: '12px' }}>
                  {new Date(user.date_joined).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Recent Crime Reports</h3>
            {stats.recent_activity.recent_crimes?.map((crime, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>{crime.category}</span>
                <span style={{ fontSize: '12px', color: '#6c757d', marginLeft: '12px' }}>
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
