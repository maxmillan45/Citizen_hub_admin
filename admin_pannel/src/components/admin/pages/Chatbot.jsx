import React, { useState, useEffect } from 'react';

function AdminChatbot() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://citizen-hub-kenya-backend.onrender.com/api/auth/admin-panel/chatbot/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading conversations...</p>;

  return (
    <div>
      <h2>Chatbot Conversations ({conversations.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {conversations.map((conv) => (
          <div key={conv.id} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>
                {conv.user?.phone_number || 'Unknown User'}
              </span>
              <span style={{ fontSize: '12px', color: '#6c757d' }}>
                {new Date(conv.created_at).toLocaleString()}
              </span>
            </div>
            <p style={{ marginBottom: '4px', fontWeight: '500' }}>Q: {conv.question}</p>
            <p style={{ color: '#495057', fontSize: '14px' }}>A: {conv.answer}</p>
            {conv.sources && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                {conv.sources.map((source, i) => (
                  <span key={i} style={{
                    padding: '2px 8px',
                    background: '#e3f2fd',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#1565c0'
                  }}>
                    Article {source}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminChatbot;
