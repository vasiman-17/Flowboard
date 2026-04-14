import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children, activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#f0f0f5'
    }}>
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} />

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease',
        background: '#0a0a0f',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Nav */}
        <nav style={{
          padding: '20px 40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f0f0f5',
              fontSize: '24px',
              cursor: 'pointer',
              marginRight: '20px'
            }}
          >
            ≡
          </button>
        </nav>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '40px', overflow: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
