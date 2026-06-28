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

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'badge-warning',
      'investigating': 'badge-info',
      'resolved': 'badge-success',
      'dismissed': 'badge-danger'
    };
    return badges[status] || 'badge-gray';
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
      <h1 className="admin-page-title">Crime Reports</h1>
      <p className="admin-page-subtitle">Manage all crime reports ({reports.length})</p>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Reported By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td style={{ textTransform: 'capitalize' }}>{report.category}</td>
                <td>{report.location}</td>
                <td>
                  <span className={`badge ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.reported_by?.phone_number || 'Unknown'}</td>
                <td style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  {new Date(report.created_at).toLocaleDateString()}
                </td>
                <td>
                  <select
                    className="input-field"
                    value={report.status}
                    onChange={(e) => updateStatus(report.id, e.target.value)}
                    style={{ padding: '4px 8px', fontSize: '12px', width: '120px' }}
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
