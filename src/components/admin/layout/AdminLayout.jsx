import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiFlag, FiHelpCircle, FiDollarSign, 
  FiMessageSquare, FiDatabase, FiSettings, FiLogOut, 
  FiMenu, FiX, FiBarChart2, FiUser
} from 'react-icons/fi';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    const phone = localStorage.getItem('phone_number');
    if (phone) {
      setUser({ phone_number: phone });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('phone_number');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: FiBarChart2, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/crimes', icon: FiFlag, label: 'Crime Reports' },
    { path: '/admin/faqs', icon: FiHelpCircle, label: 'FAQs' },
    { path: '/admin/payments', icon: FiDollarSign, label: 'Payments' },
    { path: '/admin/chatbot', icon: FiMessageSquare, label: 'Chatbot' },
    { path: '/admin/scraping', icon: FiDatabase, label: 'Data Scraping' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#f5f5f5' }}>
      {/* Sidebar - Kenyan Colors */}
      <div style={{
        width: sidebarOpen ? '240px' : '72px',
        background: '#ffffff',
        color: '#1a1a1a',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1000,
        top: 0,
        left: 0,
        borderRight: '1px solid #e0e0e0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e0e0e0',
          background: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: '16px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#006B3F'
            }}>
              {sidebarOpen ? 'Citizen Hub Admin' : 'CH'}
            </span>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a1a1a',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
          {/* Kenyan flag stripe */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(to right, #006B3F 33%, #BB0000 33%, #BB0000 66%, #006B3F 66%)',
            marginTop: '12px',
            borderRadius: '2px'
          }}></div>
        </div>

        <nav style={{ padding: '12px 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: sidebarOpen ? '12px 20px' : '12px 16px',
                  background: isActive ? '#e8f5e9' : 'transparent',
                  color: isActive ? '#006B3F' : '#555',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid #BB0000' : '3px solid transparent',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          borderTop: '1px solid #e0e0e0',
          background: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FiUser size={18} color="#006B3F" />
            </div>
            {sidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                  {user?.phone_number || 'Admin'}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Administrator
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#ffebee',
              border: 'none',
              borderRadius: '8px',
              color: '#BB0000',
              cursor: 'pointer',
              width: '100%',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              justifyContent: sidebarOpen ? 'flex-start' : 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#ffcdd2'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#ffebee'}
          >
            <FiLogOut size={16} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '240px' : '72px',
        flex: 1,
        transition: 'margin-left 0.3s ease',
        padding: '24px',
        minHeight: '100vh',
        width: '100%',
        background: '#f5f5f5'
      }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
