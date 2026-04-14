import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/workflows';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');

  const templates = [
    { id: 1, name: 'Data ETL Pipeline', desc: 'Extract, transform, and load data', category: 'data', icon: '📊' },
    { id: 2, name: 'Form Validation', desc: 'Validate and process form submissions', category: 'validation', icon: '✓' },
    { id: 3, name: 'API Response Handler', desc: 'Process API responses and format data', category: 'api', icon: '🔌' },
    { id: 4, name: 'Text Processing', desc: 'Parse and manipulate text data', category: 'text', icon: '📝' },
    { id: 5, name: 'CSV to JSON Converter', desc: 'Convert CSV files to JSON format', category: 'data', icon: '🔄' },
    { id: 6, name: 'Email Notifications', desc: 'Send automated email alerts', category: 'automation', icon: '📧' },
  ];

  const filtered = category === 'all' ? templates : templates.filter(t => t.category === category);

  const handleUseTemplate = async (template) => {
    const res = await api.create({
      name: template.name,
      description: template.desc,
      nodes: [],
      edges: []
    });
    navigate(`/editor/${res.data._id}`);
  };

  return (
    <DashboardLayout activeTab="templates">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>Workflow Templates</h1>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['all', 'data', 'validation', 'api', 'text', 'automation'].map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '10px 20px',
                background: category === cat ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'transparent',
                border: category === cat ? 'none' : '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '20px',
                color: category === cat ? 'white' : '#6366f1',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                textTransform: 'capitalize'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Templates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -8 }}
              style={{
                background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{template.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                {template.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#a0a0b8', marginBottom: '24px' }}>
                {template.desc}
              </p>
              <motion.button
                onClick={() => handleUseTemplate(template)}
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Use Template
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default TemplatesPage;
