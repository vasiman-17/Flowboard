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
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  // Fetch workflows on mount
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const data = await api.list();
        setWorkflows(data.data || []);
      } catch (err) {
        setError('Failed to load workflows');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  const handleNewWorkflow = async () => {
    try {
      const newWorkflow = await api.create({
        name: 'New Workflow',
        description: '',
        nodes: [],
        edges: [],
      });
      navigate(`/editor/${newWorkflow.data._id}`);
    } catch (err) {
      setError('Failed to create workflow');
    }
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.remove(id);
      setWorkflows(workflows.filter((w) => w._id !== id));
      setDeleteId(null);
    } catch (err) {
      setError('Failed to delete workflow');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px 32px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              Flowboard
            </h1>
            {user && (
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>
                Welcome, {user.name}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid var(--text-tertiary)',
              padding: '8px 16px',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--text-primary)';
              e.target.style.borderColor = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--text-secondary)';
              e.target.style.borderColor = 'var(--text-tertiary)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--text-primary)' }}>
            Your Workflows
          </h2>
          <button
            onClick={handleNewWorkflow}
            style={{
              background: 'var(--gradient-brand)',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            + New Workflow
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid var(--accent-rose)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '32px',
              color: 'var(--accent-rose)',
            }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading workflows...
          </div>
        ) : workflows.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '20px',
              fontSize: '16px',
            }}>
              No workflows yet. Create your first one!
            </p>
            <button
              onClick={handleNewWorkflow}
              style={{
                background: 'var(--gradient-brand)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Create First Workflow
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}>
              {workflows.map((workflow) => (
                <motion.div
                  key={workflow._id}
                  variants={itemVariants}
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-glass)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    onClick={() => handleEdit(workflow._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 style={{
                      margin: '0 0 8px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                    }}>
                      {workflow.name}
                    </h3>
                    <p style={{
                      margin: '0',
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                    }}>
                      {workflow.updatedAt
                        ? new Date(workflow.updatedAt).toLocaleDateString()
                        : 'Never'}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '12px',
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(workflow._id);
                      }}
                      style={{
                        flex: 1,
                        background: 'var(--accent-indigo)',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(workflow._id);
                      }}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid var(--accent-rose)',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        color: 'var(--accent-rose)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(24px)',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 style={{
              margin: '0 0 12px 0',
              color: 'var(--text-primary)',
            }}>
              Delete Workflow?
            </h3>
            <p style={{
              margin: '0 0 24px 0',
              color: 'var(--text-secondary)',
              fontSize: '14px',
            }}>
              This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
            }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid var(--text-tertiary)',
                  padding: '10px',
                  borderRadius: '6px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  flex: 1,
                  background: 'var(--accent-rose)',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
