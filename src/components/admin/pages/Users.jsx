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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Users</h1>
      <p className="admin-page-subtitle">Manage all users ({users.length})</p>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Score</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.phone_number}</td>
                <td>{user.email || '-'}</td>
                <td>
                  <span className={`badge ${user.account_type === 'premium' ? 'badge-success' : 'badge-gray'}`}>
                    {user.account_type || 'free'}
                  </span>
                </td>
                <td>{user.civic_score || 0}</td>
                <td>
                  <span className={`badge ${user.is_active ? 'badge-success' : 'badge-danger'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--gray)' }}>
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
