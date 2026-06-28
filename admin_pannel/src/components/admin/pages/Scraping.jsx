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

  if (loading) return <p>Loading scraping logs...</p>;

  return (
    <div>
      <h2>Data Scraping</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => triggerScrape('mps')}
          disabled={scraping}
          style={{
            padding: '10px 20px',
            backgroundColor: '#006B3F',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: scraping ? 'not-allowed' : 'pointer',
            opacity: scraping ? 0.7 : 1
          }}
        >
          Scrape MPs
        </button>
        <button
          onClick={() => triggerScrape('constitution')}
          disabled={scraping}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: scraping ? 'not-allowed' : 'pointer',
            opacity: scraping ? 0.7 : 1
          }}
        >
          Scrape Constitution
        </button>
        <button
          onClick={() => triggerScrape('all')}
          disabled={scraping}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: scraping ? 'not-allowed' : 'pointer',
            opacity: scraping ? 0.7 : 1
          }}
        >
          Scrape All
        </button>
        <button
          onClick={fetchLogs}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Refresh Logs
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          marginBottom: '16px',
          color: '#2e7d32'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {logs.map((log) => (
          <div key={log.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: '500' }}>{log.source}</span>
                <span style={{
                  marginLeft: '12px',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  backgroundColor: log.status === 'success' ? '#e8f5e9' : '#ffebee',
                  color: log.status === 'success' ? '#2e7d32' : '#c62828'
                }}>
                  {log.status}
                </span>
                {log.items_scraped > 0 && (
                  <span style={{ marginLeft: '12px', fontSize: '13px', color: '#6c757d' }}>
                    {log.items_scraped} items scraped
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>
                {log.started_at ? new Date(log.started_at).toLocaleString() : 'N/A'}
              </span>
            </div>
            {log.error_message && (
              <p style={{ fontSize: '13px', color: '#c62828', marginTop: '4px' }}>{log.error_message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scraping;
