import React, { useState, useEffect } from 'react';

function Scraping() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/scraping/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerScrape = async (source) => {
    setScraping(true);
    setMessage(`Triggering ${source} scrape...`);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/scraping/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source })
      });
      const data = await response.json();
      setMessage(data.message || 'Scraping completed');
      fetchLogs();
    } catch (err) {
      setMessage('Error triggering scrape');
    } finally {
      setScraping(false);
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
      <h1 className="admin-page-title">Data Scraping</h1>
      <p className="admin-page-subtitle">Manage data scraping from external sources</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          className="btn-primary"
          onClick={() => triggerScrape('mps')}
          disabled={scraping}
          style={{ background: 'var(--primary)' }}
        >
          Scrape MPs
        </button>
        <button
          className="btn-primary"
          onClick={() => triggerScrape('constitution')}
          disabled={scraping}
          style={{ background: '#17a2b8' }}
        >
          Scrape Constitution
        </button>
        <button
          className="btn-primary"
          onClick={() => triggerScrape('all')}
          disabled={scraping}
          style={{ background: '#6f42c1' }}
        >
          Scrape All
        </button>
        <button className="btn-secondary" onClick={fetchLogs}>
          Refresh Logs
        </button>
      </div>

      {message && (
        <div className="card" style={{ background: '#E8F5E9', borderColor: '#C8E6C9', marginBottom: '16px' }}>
          <span style={{ color: '#2E7D32' }}>{message}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {logs.map((log) => (
          <div className="card" key={log.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: '500' }}>{log.source}</span>
                <span className={`badge ${log.status === 'success' ? 'badge-success' : 'badge-danger'}`} style={{ marginLeft: '12px' }}>
                  {log.status}
                </span>
                {log.items_scraped > 0 && (
                  <span style={{ marginLeft: '12px', fontSize: '13px', color: 'var(--gray)' }}>
                    {log.items_scraped} items scraped
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--gray)' }}>
                {log.started_at ? new Date(log.started_at).toLocaleString() : 'N/A'}
              </span>
            </div>
            {log.error_message && (
              <p style={{ fontSize: '13px', color: 'var(--secondary)', marginTop: '4px' }}>{log.error_message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scraping;
