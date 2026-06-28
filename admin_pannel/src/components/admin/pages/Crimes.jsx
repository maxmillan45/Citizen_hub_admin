import React, { useState, useEffect } from 'react';

function Crimes() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrimes();
  }, []);

  const fetchCrimes = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/crimes/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error('Error fetching crimes:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (reportId, status) => {
    try {
      const token = localStorage.getItem('access_token');
      await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/crimes/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ report_id: reportId, status })
      });
      fetchCrimes();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#ffc107',
      'investigating': '#17a2b8',
      'resolved': '#28a745',
      'dismissed': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) return <p>Loading crime reports...</p>;

  return (
    <div>
      <h2>Crime Reports ({reports.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <thead>
            <tr style={{ background: '#f5f7fa' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Reported By</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>{report.category}</td>
                <td style={{ padding: '12px 16px' }}>{report.location}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: `${getStatusColor(report.status)}20`,
                    color: getStatusColor(report.status)
                  }}>
                    {report.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>{report.reported_by?.phone_number || 'Unknown'}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>
                  {new Date(report.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <select
                    value={report.status}
                    onChange={(e) => updateStatus(report.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Crimes;
