import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '../components/3D/Hero3D';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          zIndex: 999,
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Flowboard
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'var(--gradient-brand)',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {isAuthenticated ? 'Dashboard' : 'Get Started'}
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 40px 40px', position: 'relative', background: 'linear-gradient(135deg, var(--bg-primary) 0%, #15151f 100%)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px', opacity: 0.3, pointerEvents: 'none' }} />

        <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 10 }}>
          <motion.h1 variants={itemVariants} style={{ fontSize: '64px', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #a8aeff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1.2' }}>
            Build Workflows. Transform Data. Automate Everything.
          </motion.h1>

          <motion.p variants={itemVariants} style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '24px auto 40px', lineHeight: '1.6' }}>
            Drag-and-drop node-based workflow builder. No code required.
          </motion.p>

          <motion.button onClick={handleGetStarted} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: 'var(--gradient-brand)', border: 'none', padding: '16px 32px', borderRadius: '8px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
            Start Building Free
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', opacity: 0.3 }}>
          <Hero3D />
        </motion.div>
      </section>

      {/* FEATURES SECTION - Scrollable */}
      <section style={{ padding: '120px 40px', background: 'var(--bg-primary)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 variants={itemVariants} style={{ fontSize: '42px', fontWeight: '700', marginBottom: '60px', textAlign: 'center' }}>
            Powerful Features
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '⚙️', title: '12+ Nodes', desc: 'Input, transform, condition, and output nodes.' },
              { icon: '🔓', title: 'No Code Required', desc: 'Visually build workflows without any code.' },
              { icon: '⚡', title: 'Real-Time Results', desc: 'See execution results instantly.' },
              { icon: '🔐', title: 'Secure & Private', desc: 'JWT auth, encrypted, user-isolated.' },
              { icon: '📊', title: 'Data Transforms', desc: 'JSON parsing, text ops, comparisons.' },
              { icon: '🌍', title: 'Free Forever', desc: 'Unlimited workflows, no credit card.' },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -8 }} style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '32px' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS - Scrollable */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(135deg, #0a0a0f 0%, #15151f 100%)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 variants={itemVariants} style={{ fontSize: '42px', fontWeight: '700', marginBottom: '60px', textAlign: 'center' }}>
            How It Works
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {[
              { step: '01', title: 'Create', desc: 'Start with a blank canvas.' },
              { step: '02', title: 'Drag & Connect', desc: 'Connect nodes with edges.' },
              { step: '03', title: 'Configure', desc: 'Set up inputs and outputs.' },
              { step: '04', title: 'Execute', desc: 'Run and see real-time results.' },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div style={{ fontSize: '48px', fontWeight: '700', background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '16px' }}>{item.step}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING SECTION */}
      <section style={{ padding: '120px 40px', background: 'var(--bg-primary)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2 variants={itemVariants} style={{ fontSize: '42px', fontWeight: '700', marginBottom: '60px', textAlign: 'center' }}>
            Simple Pricing
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Free', price: '$0', features: ['Unlimited workflows', 'Up to 50 nodes', 'Community support'] },
              { name: 'Pro', price: '$29/mo', features: ['Everything in Free', 'Up to 500 nodes', 'Email support', 'API access'], highlight: true },
              { name: 'Enterprise', price: 'Custom', features: ['Custom limits', 'Dedicated support', 'SSO & SAML'] },
            ].map((plan, i) => (
              <motion.div key={i} variants={itemVariants} style={{ background: 'var(--bg-glass)', border: plan.highlight ? '2px solid var(--accent-indigo)' : '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{plan.name}</h3>
                <div style={{ fontSize: '42px', fontWeight: '700', marginBottom: '24px' }}>{plan.price}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-secondary)' }}>✓ {f}</li>
                  ))}
                </ul>
                <button onClick={handleGetStarted} style={{ width: '100%', padding: '12px', background: plan.highlight ? 'var(--gradient-brand)' : 'transparent', border: plan.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.2)', color: plan.highlight ? 'white' : 'var(--text-primary)', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 40px', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        <p>© 2026 Flowboard. All rights reserved. Built with ❤️ for creators.</p>
      </footer>
    </div>
  );
};

export default HomePage;
