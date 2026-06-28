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

  if (loading) return <p>Loading payments...</p>;

  return (
    <div>
      <h2>Payments ({payments.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <thead>
            <tr style={{ background: '#f5f7fa' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Reference</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Receipt</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px 16px' }}>{payment.phone_number}</td>
                <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>KES {payment.amount}</td>
                <td style={{ padding: '12px 16px' }}>{payment.account_reference}</td>
                <td style={{ padding: '12px 16px' }}>{payment.mpesa_receipt_number || '-'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: payment.is_completed ? '#e8f5e9' : '#fff3e0',
                    color: payment.is_completed ? '#2e7d32' : '#e65100'
                  }}>
                    {payment.is_completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>
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
