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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">System Settings</h1>
      <p className="admin-page-subtitle">View and manage system configuration</p>

      <div className="card">
        <div className="grid-2">
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Debug Mode</label>
            <span className={`badge ${settings?.debug ? 'badge-danger' : 'badge-success'}`}>
              {settings?.debug ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Maintenance Mode</label>
            <span className={`badge ${settings?.maintenance_mode ? 'badge-danger' : 'badge-success'}`}>
              {settings?.maintenance_mode ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>API Version</label>
            <span style={{ color: 'var(--dark)' }}>{settings?.api_version || 'v1'}</span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Timezone</label>
            <span style={{ color: 'var(--dark)' }}>{settings?.timezone || 'UTC'}</span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>Allowed Hosts</label>
            <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
              {settings?.allowed_hosts?.join(', ') || '-'}
            </span>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}>CORS Origins</label>
            <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
              {settings?.cors_allowed_origins?.join(', ') || '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
