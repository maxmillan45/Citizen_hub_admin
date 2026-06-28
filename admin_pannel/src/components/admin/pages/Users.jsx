import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/users/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users ({users.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <thead>
            <tr style={{ background: '#f5f7fa' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Score</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>{user.phone_number}</td>
                <td style={{ padding: '12px 16px' }}>{user.email || '-'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: user.account_type === 'premium' ? '#e8f5e9' : '#f5f5f5',
                    color: user.account_type === 'premium' ? '#2e7d32' : '#666'
                  }}>
                    {user.account_type || 'free'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>{user.civic_score || 0}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
                    color: user.is_active ? '#2e7d32' : '#c62828'
                  }}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>
                  {new Date(user.date_joined).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
