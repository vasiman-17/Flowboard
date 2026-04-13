import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/workflows';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* TOP HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>Flowboard</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Welcome, {user?.name || 'User'}</p>
        </div>
        <motion.button onClick={handleLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'transparent', border: '1px solid var(--accent-rose)', padding: '10px 20px', borderRadius: '6px', color: 'var(--accent-rose)', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
          Logout
        </motion.button>
      </motion.div>

      {/* NAVIGATION TABS */}
      <div style={{ padding: '40px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '20px' }}>
          {['overview', 'workflows', 'templates', 'analytics'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ color: 'var(--accent-indigo)' }}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? 'var(--accent-indigo)' : 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize',
                paddingBottom: activeTab === tab ? '8px' : 0,
                borderBottom: activeTab === tab ? '2px solid var(--accent-indigo)' : 'none',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
              <StatCard icon="📊" label="Total Workflows" value={workflows.length} />
              <StatCard icon="⚡" label="Last Run" value="5 min ago" />
              <StatCard icon="✅" label="Success Rate" value="98.5%" />
              <StatCard icon="🚀" label="Executions This Month" value={workflows.length * 12} />
            </div>

            <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Quick Actions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <ActionCard icon="➕" title="Create Workflow" desc="Start building a new workflow" onClick={handleNewWorkflow} />
                <ActionCard icon="📚" title="View Templates" desc="Browse workflow templates" onClick={() => setActiveTab('templates')} />
                <ActionCard icon="📖" title="Documentation" desc="Learn how to use Flowboard" onClick={() => window.open('#')} />
                <ActionCard icon="⚙️" title="Settings" desc="Manage your account" onClick={() => {}} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* WORKFLOWS TAB */}
        {activeTab === 'workflows' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Your Workflows</h2>
              <motion.button onClick={handleNewWorkflow} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'var(--gradient-brand)', border: 'none', padding: '12px 24px', borderRadius: '6px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                + New Workflow
              </motion.button>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading workflows...</p>
            ) : workflows.length === 0 ? (
              <EmptyState onClick={handleNewWorkflow} />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {workflows.map((w) => (
                  <WorkflowCard key={w._id} workflow={w} onEdit={() => navigate(`/editor/${w._id}`)} onDelete={() => setDeleteId(w._id)} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '30px' }}>Workflow Templates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { name: 'Data Transformation', desc: 'Clean and transform API responses', type: 'transform' },
                { name: 'Form Validation', desc: 'Validate and process form submissions', type: 'validation' },
                { name: 'Report Generation', desc: 'Generate and format reports', type: 'reporting' },
                { name: 'SMS Notifications', desc: 'Send alerts and notifications', type: 'automation' },
              ].map((template, i) => (
                <TemplateCard key={i} template={template} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '30px' }}>Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              <AnalyticsCard title="Workflow Execution Trend" stats="↑ 23% this week" />
              <AnalyticsCard title="Average Execution Time" stats="2.3 seconds" />
              <AnalyticsCard title="Total Nodes Created" stats={workflows.reduce((sum, w) => sum + (w.nodes?.length || 0), 0)} />
            </div>
          </motion.div>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <DeleteModal
          onConfirm={async () => {
            await api.remove(deleteId);
            setWorkflows(workflows.filter((w) => w._id !== deleteId));
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

// STAT CARD COMPONENT
const StatCard = ({ icon, label, value }) => (
  <motion.div whileHover={{ y: -4 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '24px' }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>{label}</p>
    <p style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>{value}</p>
  </motion.div>
);

// ACTION CARD COMPONENT
const ActionCard = ({ icon, title, desc, onClick }) => (
  <motion.div onClick={onClick} whileHover={{ scale: 1.02 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s' }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>{title}</h3>
    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
  </motion.div>
);

// WORKFLOW CARD COMPONENT
const WorkflowCard = ({ workflow, onEdit, onDelete }) => (
  <motion.div whileHover={{ y: -8 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '24px' }}>
    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>{workflow.name}</h3>
    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
      {workflow.nodes?.length || 0} nodes • Updated {workflow.updatedAt ? new Date(workflow.updatedAt).toLocaleDateString() : 'Never'}
    </p>
    <div style={{ display: 'flex', gap: '12px' }}>
      <motion.button onClick={onEdit} whileHover={{ scale: 1.05 }} style={{ flex: 1, background: 'var(--accent-indigo)', border: 'none', padding: '10px', borderRadius: '6px', color: 'white', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
        Edit
      </motion.button>
      <motion.button onClick={onDelete} whileHover={{ scale: 1.05 }} style={{ flex: 1, background: 'transparent', border: '1px solid var(--accent-rose)', padding: '10px', borderRadius: '6px', color: 'var(--accent-rose)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
        Delete
      </motion.button>
    </div>
  </motion.div>
);

// TEMPLATE CARD COMPONENT
const TemplateCard = ({ template }) => (
  <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer' }}>
    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{template.name}</h3>
    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>{template.desc}</p>
    <motion.button whileHover={{ scale: 1.05 }} style={{ background: 'var(--accent-indigo)', border: 'none', padding: '10px 20px', borderRadius: '6px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
      Use Template
    </motion.button>
  </motion.div>
);

// ANALYTICS CARD COMPONENT
const AnalyticsCard = ({ title, stats }) => (
  <motion.div whileHover={{ y: -4 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '32px' }}>
    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>{title}</h3>
    <p style={{ fontSize: '32px', fontWeight: '700', margin: 0, background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {stats}
    </p>
  </motion.div>
);

// EMPTY STATE COMPONENT
const EmptyState = ({ onClick }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
    <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '20px' }}>No workflows yet. Create your first one!</p>
    <motion.button onClick={onClick} whileHover={{ scale: 1.05 }} style={{ background: 'var(--gradient-brand)', border: 'none', padding: '12px 24px', borderRadius: '6px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
      Create First Workflow
    </motion.button>
  </motion.div>
);

// DELETE MODAL COMPONENT
const DeleteModal = ({ onConfirm, onCancel }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', borderRadius: '12px', padding: '32px', maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Delete Workflow?</h3>
      <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>This cannot be undone.</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <motion.button onClick={onCancel} whileHover={{ scale: 1.05 }} style={{ flex: 1, background: 'transparent', border: '1px solid var(--text-tertiary)', padding: '10px', borderRadius: '6px', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
          Cancel
        </motion.button>
        <motion.button onClick={onConfirm} whileHover={{ scale: 1.05 }} style={{ flex: 1, background: 'var(--accent-rose)', border: 'none', padding: '10px', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
          Delete
        </motion.button>
      </div>
    </motion.div>
  </div>
);

export default DashboardPage;
