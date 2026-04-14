import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/workflows';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const WorkflowsPage = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
    const res = await api.create({ name: 'New Workflow', description: '', nodes: [], edges: [] });
    navigate(`/editor/${res.data._id}`);
  };

  const filtered = workflows.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout activeTab="workflows">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>Workflows</h1>
          <motion.button
            onClick={handleNewWorkflow}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            + Create Workflow
          </motion.button>
        </div>

        {/* Search */}
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="text"
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            marginBottom: '32px',
            background: '#151520',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
            color: '#f0f0f5',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />

        {/* Workflows Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#a0a0b8' }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            background: '#151520',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ color: '#a0a0b8', fontSize: '16px' }}>
              {search ? 'No workflows found' : 'No workflows yet'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filtered.map((w) => (
              <motion.div
                key={w._id}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/editor/${w._id}`)}
                style={{
                  background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{w.name}</h3>
                <p style={{ fontSize: '13px', color: '#a0a0b8' }}>
                  {w.nodes?.length || 0} nodes • {w.edges?.length || 0} connections
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default WorkflowsPage;
