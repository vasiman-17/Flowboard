import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const AnalyticsPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <DashboardLayout activeTab="analytics">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={fadeInUp} style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          Analytics
        </motion.h1>
        <motion.p variants={fadeInUp} style={{ fontSize: '16px', color: '#a0a0b8', marginBottom: '60px' }}>
          Track your workflow performance and usage
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          variants={fadeInUp}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}
        >
          {[
            { label: 'Total Executions', value: '1,234', trend: '↑ 12%' },
            { label: 'Success Rate', value: '98.5%', trend: '↑ 2%' },
            { label: 'Avg Response Time', value: '234ms', trend: '↓ 45ms' },
            { label: 'Data Processed', value: '2.3GB', trend: '↑ 1.2GB' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '32px'
              }}
            >
              <div style={{ fontSize: '14px', color: '#a0a0b8', marginBottom: '12px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#22d3ee' }}>
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={fadeInUp}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Performance Metrics</h2>
          <div style={{
            background: '#151520',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '80px 40px',
            textAlign: 'center',
            color: '#a0a0b8'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
            <p>Analytics charts coming soon</p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
