import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const ShowcasePage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <DashboardLayout activeTab="showcase">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={fadeInUp} style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          Showcase
        </motion.h1>
        <motion.p variants={fadeInUp} style={{ fontSize: '16px', color: '#a0a0b8', marginBottom: '60px' }}>
          Explore featured workflows and community creations
        </motion.p>

        {/* Featured Section */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Featured Workflows</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: 'Analytics Dashboard Generator', creator: '@alice', views: '2.3K' },
              { title: 'Real-time Data Pipeline', creator: '@bob', views: '1.8K' },
              { title: 'Automation Suite', creator: '@carol', views: '3.1K' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                style={{
                  background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#a0a0b8' }}>
                  <span>{item.creator}</span>
                  <span>👁️ {item.views}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Models Section */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>3D Visualizations</h2>
          <div style={{
            background: '#151520',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '80px 40px',
            textAlign: 'center',
            color: '#a0a0b8'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎨</div>
            <p>3D model visualizations coming soon</p>
          </div>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div variants={fadeInUp}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Video Tutorials</h2>
          <div style={{
            background: '#151520',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '80px 40px',
            textAlign: 'center',
            color: '#a0a0b8'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📹</div>
            <p>Video tutorials coming soon</p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ShowcasePage;
