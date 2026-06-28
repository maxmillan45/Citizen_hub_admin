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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--light-gray)' }}>
      {/* Sidebar */}
      <div className={`admin-sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <span className="logo-text">{sidebarOpen ? 'Citizen Hub Admin' : 'CH'}</span>
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

        <nav style={{ padding: '12px 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                style={{
                  padding: sidebarOpen ? '12px 20px' : '12px 16px',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center'
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
          borderTop: '1px solid rgba(255,255,255,0.1)'
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
            className="btn-danger"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'white',
              padding: '8px 16px'
            }}
          >
            <FiLogOut size={16} />
            {sidebarOpen && <span style={{ marginLeft: '8px' }}>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`admin-main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
