import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const CommunityPage = () => {
  return (
    <DashboardLayout activeTab="community">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Community</h1>
        <p style={{ fontSize: '16px', color: '#a0a0b8', marginBottom: '60px' }}>
          Connect with other Flowboard users and share your workflows
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {[
            { title: 'Featured Members', desc: 'Top contributors to the community', icon: '👑' },
            { title: 'Recent Discussions', desc: 'Latest forums and conversations', icon: '💬' },
            { title: 'Shared Templates', desc: 'Community created templates', icon: '📦' },
            { title: 'Help & Support', desc: 'Get help from community experts', icon: '🆘' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#a0a0b8' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CommunityPage;
