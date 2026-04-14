import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <DashboardLayout activeTab="settings">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '60px' }}>Settings</h1>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Profile</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '700',
              color: 'white'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>{user?.name}</div>
              <div style={{ fontSize: '14px', color: '#a0a0b8' }}>{user?.email}</div>
            </div>
          </div>
        </motion.div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Preferences</h2>

          {/* Notifications */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Email Notifications</div>
                <div style={{ fontSize: '13px', color: '#a0a0b8' }}>Get updates via email</div>
              </div>
              <motion.button
                onClick={() => setNotifEmail(!notifEmail)}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '50px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  background: notifEmail ? '#6366f1' : '#4a4a5e',
                  cursor: 'pointer'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>SMS Notifications</div>
                <div style={{ fontSize: '13px', color: '#a0a0b8' }}>Get alerts via SMS</div>
              </div>
              <motion.button
                onClick={() => setNotifSms(!notifSms)}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '50px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  background: notifSms ? '#6366f1' : '#4a4a5e',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #2a1a1a 0%, #3a1a2a 100%)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '12px',
            padding: '32px'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#f43f5e' }}>Danger Zone</h2>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #ff6b7a 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SettingsPage;
