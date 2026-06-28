import React, { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/settings/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div>
      <h2>System Settings</h2>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Debug Mode</label>
            <span style={{
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '13px',
              backgroundColor: settings?.debug ? '#ffebee' : '#e8f5e9',
              color: settings?.debug ? '#c62828' : '#2e7d32'
            }}>
              {settings?.debug ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Maintenance Mode</label>
            <span style={{
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '13px',
              backgroundColor: settings?.maintenance_mode ? '#ffebee' : '#e8f5e9',
              color: settings?.maintenance_mode ? '#c62828' : '#2e7d32'
            }}>
              {settings?.maintenance_mode ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>API Version</label>
            <span>{settings?.api_version || 'v1'}</span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Timezone</label>
            <span>{settings?.timezone || 'UTC'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
