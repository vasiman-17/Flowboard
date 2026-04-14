import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const DashboardSidebar = ({ open, setOpen, activeTab }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'workflows', label: 'Workflows', icon: '⚙️', path: '/workflows' },
    { id: 'templates', label: 'Templates', icon: '📋', path: '/templates' },
    { id: 'showcase', label: 'Showcase', icon: '🎨', path: '/showcase' },
    { id: 'community', label: 'Community', icon: '👥', path: '/community' },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
            display: window.innerWidth > 768 ? 'none' : 'block'
          }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: open ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '280px',
          background: '#151520',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          zIndex: 95,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div
            onClick={() => navigate('/dashboard')}
            style={{
              fontSize: '20px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}
          >
            Flowboard
          </div>
        </div>

        {/* User Profile */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f0f0f5' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '12px', color: '#a0a0b8', marginTop: '4px' }}>
                Free Plan
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ flex: 1, padding: '16px 8px' }}>
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 4 }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '8px',
                background: activeTab === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: activeTab === item.id ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === item.id ? '#6366f1' : '#a0a0b8',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px 8px' }}>
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 4 }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: 'rgba(244, 63, 94, 0.05)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '8px',
              color: '#f43f5e',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
