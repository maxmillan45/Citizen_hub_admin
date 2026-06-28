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
      {/* Sidebar - Kenyan Flag Colors */}
      <div style={{
        width: sidebarOpen ? '260px' : '72px',
        backgroundColor: '#1a1a1a',
        color: 'white',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1000,
        top: 0,
        left: 0,
        borderRight: '3px solid #BB0000'
      }}>
        {/* Header with Kenyan Flag stripe */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #1a1a1a 70%, #BB0000 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              background: 'linear-gradient(to right, #006B3F, #BB0000, #006B3F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {sidebarOpen ? 'Citizen Hub Admin' : 'CH'}
            </span>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
          {/* Kenyan flag colors stripe */}
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
                  backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid #BB0000' : '3px solid transparent',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  fontSize: '14px'
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
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(to top, #1a1a1a 50%, transparent)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <FiUser size={20} style={{ flexShrink: 0 }} />
            {sidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {user?.phone_number || 'Admin'}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
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
              background: 'rgba(187, 0, 0, 0.3)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              justifyContent: sidebarOpen ? 'flex-start' : 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(187, 0, 0, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(187, 0, 0, 0.3)'}
          >
            <FiLogOut size={16} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '260px' : '72px',
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
