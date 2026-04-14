import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  return (
    <div style={{ background: '#0a0a0f', color: '#f0f0f5', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '800',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }} onClick={() => navigate('/')}>
          Flowboard
        </div>
        <motion.button
          onClick={handleGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
          }}
        >
          {isAuthenticated ? 'Dashboard' : 'Get Started'}
        </motion.button>
      </nav>

      {/* HERO SECTION - Bold & Impactful */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 60px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          right: '-10%',
          top: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ maxWidth: '700px', position: 'relative', zIndex: 10 }}
        >
          <motion.h1
            variants={fadeInUp}
            style={{
              fontSize: '64px',
              fontWeight: '800',
              marginBottom: '20px',
              lineHeight: '1.1',
              color: '#ffffff'
            }}
          >
            Build Powerful Workflows
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Without Code
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            style={{
              fontSize: '18px',
              color: '#a0a0b8',
              marginBottom: '40px',
              lineHeight: '1.7',
              maxWidth: '600px'
            }}
          >
            Create intelligent automation workflows using a visual node-based builder. No programming required. Real-time execution with unlimited possibilities.
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 34px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Start Free →
            </motion.button>
            <motion.div
              style={{
                fontSize: '14px',
                color: '#a0a0b8',
                fontWeight: '500'
              }}
            >
              Simple • Powerful • Free
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES - Alternating Layout */}
      <section style={{ padding: '120px 60px', background: '#0a0a0f' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Feature 1: Image + Text */}
          <motion.div variants={fadeInUp} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '120px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a4a 100%)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔗</div>
              <div style={{ fontSize: '16px', color: '#999', fontWeight: '500' }}>
                Drag &amp; Drop Workflow Builder
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '20px', color: '#ffffff', lineHeight: '1.2' }}>
                Connect Anything
              </h2>
              <p style={{ fontSize: '16px', color: '#a0a0b8', lineHeight: '1.8', marginBottom: '24px' }}>
                Seamlessly connect data sources, transforms, and outputs. Build complex workflows by dragging nodes onto a canvas and connecting them with edges. No syntax required.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['12+ Pre-built Node Types', 'Real-time Visual Feedback', 'Unlimited Node Connections'].map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: '#c0c0d8', marginBottom: '12px', fontWeight: '500' }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Text + Image */}
          <motion.div variants={fadeInUp} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '120px'
          }}>
            <div>
              <h2 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '20px', color: '#ffffff', lineHeight: '1.2' }}>
                Transform Your Data
              </h2>
              <p style={{ fontSize: '16px', color: '#a0a0b8', lineHeight: '1.8', marginBottom: '24px' }}>
                Parse JSON, manipulate strings, filter arrays, and perform complex transformations on your data. Combine nodes to create sophisticated data pipelines without writing a single line of code.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['JSON Parsing', 'Text Manipulation', 'Conditional Logic'].map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: '#c0c0d8', marginBottom: '12px', fontWeight: '500' }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #1a2a3a 0%, #2a1a3a 100%)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>⚡</div>
              <div style={{ fontSize: '16px', color: '#999', fontWeight: '500' }}>
                Instant Data Processing
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Image + Text */}
          <motion.div variants={fadeInUp} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e2e1e 0%, #2a3a2a 100%)',
              borderRadius: '12px',
              padding: '60px 40px',
              textAlign: 'center',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔐</div>
              <div style={{ fontSize: '16px', color: '#999', fontWeight: '500' }}>
                Enterprise-Grade Security
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '44px', fontWeight: '800', marginBottom: '20px', color: '#ffffff', lineHeight: '1.2' }}>
                Built for Trust
              </h2>
              <p style={{ fontSize: '16px', color: '#a0a0b8', lineHeight: '1.8', marginBottom: '24px' }}>
                Your data stays secure with JWT authentication, end-to-end encryption, and strict user isolation. Every workflow is private to you. No exceptions.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['JWT Authentication', 'User Isolation', 'Encrypted Data'].map((item, i) => (
                  <li key={i} style={{ fontSize: '15px', color: '#c0c0d8', marginBottom: '12px', fontWeight: '500' }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* HOW IT WORKS - Simple Linear Path */}
      <section style={{ padding: '120px 60px', background: '#151520' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '80px',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            Get Started in Minutes
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {[
              { num: '01', title: 'Sign Up', desc: 'Create your free account in seconds' },
              { num: '02', title: 'Create', desc: 'Start with a blank workflow canvas' },
              { num: '03', title: 'Build', desc: 'Drag nodes and connect them visually' },
              { num: '04', title: 'Execute', desc: 'Run and see real-time results' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div style={{
                  fontSize: '52px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '16px'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#a0a0b8', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* REAL WORKFLOWS - Showcase */}
      <section style={{ padding: '120px 60px', background: '#0a0a0f' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '60px',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            Workflows Like These
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              {
                title: 'Data ETL Pipeline',
                desc: 'Extract, transform, and load data from multiple sources into your database',
                gradient: 'linear-gradient(135deg, #1e1e2e 0%, #2a1a5a 100%)',
                accent: 'rgba(99, 102, 241, 0.2)'
              },
              {
                title: 'Form Validation Engine',
                desc: 'Validate user input against complex rules and conditional logic',
                gradient: 'linear-gradient(135deg, #1a2a3a 0%, #1a3a4a 100%)',
                accent: 'rgba(34, 211, 238, 0.2)'
              },
              {
                title: 'API Response Handler',
                desc: 'Process API responses, extract data, and format for storage',
                gradient: 'linear-gradient(135deg, #1e2e1e 0%, #2a3a2a 100%)',
                accent: 'rgba(16, 185, 129, 0.2)'
              }
            ].map((workflow, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                style={{
                  background: workflow.gradient,
                  border: `1px solid ${workflow.accent}`,
                  borderRadius: '12px',
                  padding: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#ffffff' }}>
                  {workflow.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#a0a0b8', lineHeight: '1.6' }}>
                  {workflow.desc}
                </p>
                <div style={{ marginTop: '24px', fontSize: '13px', fontWeight: '600', color: '#6366f1' }}>
                  View Example →
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '120px 60px', background: '#151520' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '60px',
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            Simple, Honest Pricing
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { name: 'Free', price: '$0', type: 'Forever', features: ['Unlimited workflows', 'Up to 50 nodes', 'Community support'] },
              { name: 'Pro', price: '$29', type: '/month', features: ['Unlimited nodes', 'Email support', 'API access', 'Advanced analytics'], highlight: true },
              { name: 'Enterprise', price: 'Custom', type: '', features: ['Custom limits', 'Dedicated support', 'SSO & SAML', '99.9% SLA'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, #2a1a5a 0%, #1e1e2e 100%)' : '#0a0a0f',
                  border: plan.highlight ? '2px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '40px',
                  position: 'relative'
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '20px',
                    background: '#6366f1',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    RECOMMENDED
                  </div>
                )}
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#ffffff' }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff' }}>
                    {plan.price}
                  </span>
                  {plan.type && <span style={{ fontSize: '14px', color: '#a0a0b8', marginLeft: '8px' }}>{plan.type}</span>}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: '14px', color: '#c0c0d8', marginBottom: '12px' }}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: plan.highlight ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'transparent',
                    border: plan.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: plan.highlight ? 'white' : '#ffffff',
                    borderRadius: '6px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 60px', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)', textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#ffffff',
              lineHeight: '1.2'
            }}
          >
            Ready to automate?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            style={{
              fontSize: '18px',
              color: '#a0a0b8',
              marginBottom: '40px',
              lineHeight: '1.7'
            }}
          >
            Join thousands of users building powerful workflows without code. Start free today, no credit card required.
          </motion.p>
          <motion.button
            onClick={handleGetStarted}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 34px rgba(99, 102, 241, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 48px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Start Building Free →
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 60px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        color: '#6b6b82',
        fontSize: '14px',
        background: '#0a0a0f'
      }}>
        <p>© 2026 Flowboard. All rights reserved. Built with precision.</p>
      </footer>
    </div>
  );
};

export default HomePage;
