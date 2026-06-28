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

  if (loading) return <p>Loading FAQs...</p>;

  return (
    <div>
      <h2>FAQs ({faqs.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq) => (
          <div key={faq.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>{faq.question}</span>
              <span style={{
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                backgroundColor: '#e3f2fd',
                color: '#1565c0'
              }}>
                {faq.category}
              </span>
            </div>
            <p style={{ color: '#495057', fontSize: '14px' }}>{faq.answer}</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
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
