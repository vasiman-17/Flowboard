import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/workflows';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const data = await api.list();
        setWorkflows(data.data || []);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  const handleNewWorkflow = async () => {
    try {
      const res = await api.create({ name: 'New Workflow', description: '', nodes: [], edges: [] });
      navigate(`/editor/${res.data._id}`);
    } catch (err) {
      console.error('Failed to create:', err);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <DashboardLayout activeTab="dashboard">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Section */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px' }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '16px', color: '#a0a0b8' }}>
            Here's what's happening with your workflows today
          </p>
        </motion.div>

        {/* Quick Stats */}
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
            { label: 'Total Workflows', value: workflows.length, change: '+2 this week' },
            { label: 'Last Execution', value: '2 hours ago', change: 'All successful' },
            { label: 'Success Rate', value: '98.5%', change: 'Excellent' },
            { label: 'Data Processed', value: '45.2 GB', change: 'This month' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '14px', color: '#a0a0b8', marginBottom: '12px', fontWeight: '500' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#6b6b82' }}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeInUp} style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <motion.button
              onClick={handleNewWorkflow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              ➕ Create Workflow
            </motion.button>
            <motion.button
              onClick={() => navigate('/templates')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '24px',
                background: 'transparent',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                color: '#6366f1',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              📋 Browse Templates
            </motion.button>
            <motion.button
              onClick={() => navigate('/showcase')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '24px',
                background: 'transparent',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                color: '#6366f1',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              🎨 Gallery
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Workflows */}
        <motion.div variants={fadeInUp}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
            Recent Workflows
          </h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#a0a0b8' }}>Loading...</p>
          ) : workflows.length === 0 ? (
            <div style={{
              background: '#151520',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              color: '#a0a0b8'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
              <p>No workflows yet. Create your first one to get started!</p>
              <motion.button
                onClick={handleNewWorkflow}
                whileHover={{ scale: 1.05 }}
                style={{
                  marginTop: '20px',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Create First Workflow
              </motion.button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {workflows.map((w) => (
                <motion.div
                  key={w._id}
                  whileHover={{ y: -8 }}
                  style={{
                    background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '12px',
                    padding: '24px'
                  }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>
                    {w.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#a0a0b8', marginBottom: '16px' }}>
                    {w.nodes?.length || 0} nodes •Updated {w.updatedAt ? new Date(w.updatedAt).toLocaleDateString() : 'Never'}
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      onClick={() => navigate(`/editor/${w._id}`)}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '6px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => setDeleteId(w._id)}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid #f43f5e',
                        padding: '10px',
                        borderRadius: '6px',
                        color: '#f43f5e',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Delete Modal */}
      {deleteId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#1e1e2e',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px'
            }}
          >
            <h3 style={{ marginBottom: '12px', color: '#ffffff' }}>Delete Workflow?</h3>
            <p style={{ marginBottom: '24px', color: '#a0a0b8', fontSize: '14px' }}>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button
                onClick={() => setDeleteId(null)}
                whileHover={{ scale: 1.05 }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '10px',
                  borderRadius: '6px',
                  color: '#a0a0b8',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={async () => {
                  await api.remove(deleteId);
                  setWorkflows(workflows.filter((w) => w._id !== deleteId));
                  setDeleteId(null);
                }}
                whileHover={{ scale: 1.05 }}
                style={{
                  flex: 1,
                  background: '#f43f5e',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
