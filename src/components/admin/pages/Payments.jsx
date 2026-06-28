import React, { useState, useEffect } from 'react';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/payments/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error('Error fetching payments:', err);
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
      <h1 className="admin-page-title">Payments</h1>
      <p className="admin-page-subtitle">View all M-Pesa transactions ({payments.length})</p>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Phone</th>
              <th>Amount</th>
              <th>Reference</th>
              <th>Receipt</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.phone_number}</td>
                <td style={{ fontWeight: 'bold' }}>KES {payment.amount}</td>
                <td>{payment.account_reference}</td>
                <td>{payment.mpesa_receipt_number || '-'}</td>
                <td>
                  <span className={`badge ${payment.is_completed ? 'badge-success' : 'badge-warning'}`}>
                    {payment.is_completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--gray)' }}>
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
