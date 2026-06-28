import React, { useState, useEffect } from 'react';

function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/faqs/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setFaqs(data.faqs || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
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
      <h1 className="admin-page-title">FAQs</h1>
      <p className="admin-page-subtitle">Manage all frequently asked questions ({faqs.length})</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq) => (
          <div className="card" key={faq.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>{faq.question}</span>
              <span className="badge badge-info">{faq.category}</span>
            </div>
            <p style={{ color: 'var(--dark)', fontSize: '14px' }}>{faq.answer}</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: 'var(--gray)' }}>
              <span>Views: {faq.views}</span>
              <span>Helpful: {faq.helpful_count}</span>
              <span>Not Helpful: {faq.not_helpful_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqs;
