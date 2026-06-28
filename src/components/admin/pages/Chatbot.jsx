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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Chatbot Conversations</h1>
      <p className="admin-page-subtitle">Review all AI legal assistant conversations ({conversations.length})</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {conversations.map((conv) => (
          <div className="card" key={conv.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>
                {conv.user?.phone_number || 'Unknown User'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--gray)' }}>
                {new Date(conv.created_at).toLocaleString()}
              </span>
            </div>
            <p style={{ marginBottom: '4px', fontWeight: '500' }}>Q: {conv.question}</p>
            <p style={{ color: 'var(--dark)', fontSize: '14px' }}>A: {conv.answer}</p>
            {conv.sources && conv.sources.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {conv.sources.map((source, i) => (
                  <span key={i} className="badge badge-info">
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
