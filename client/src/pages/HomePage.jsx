import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '../components/3D/Hero3D';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);

      // Update active section
      const sections = ['hero', 'features', 'how-it-works', 'showcase', 'pricing', 'faqs', 'footer'];
      const sectionElements = sections.map(s => document.getElementById(s));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (sectionElements[i] && sectionElements[i].offsetTop <= scrollTop + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

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

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', overflow: 'hidden' }}>
      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          background: 'var(--gradient-brand)',
          transformOrigin: 'left',
          zIndex: 1000,
        }}
      />

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
          onClick={() => handleScrollTo('hero')}
        >
          Flowboard
        </div>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {['features', 'how-it-works', 'pricing'].map((item) => (
            <motion.button
              key={item}
              onClick={() => handleScrollTo(item)}
              whileHover={{ color: 'var(--accent-indigo)' }}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item ? 'var(--accent-indigo)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === item ? '600' : '400',
                textTransform: 'capitalize',
                transition: 'all 0.3s',
              }}
            >
              {item.replace('-', ' ')}
            </motion.button>
          ))}

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

      {/* ─────────────────────────────────────────── HERO SECTION ─────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 40px 40px',
          position: 'relative',
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, #15151f 100%)',
        }}
      >
        {/* Animated Background Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            textAlign: 'center',
            maxWidth: '900px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <motion.div
            variants={itemVariants}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '20px',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '13px', color: 'var(--accent-indigo)', fontWeight: '600' }}>
              ✨ No-Code Workflow Automation
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: '64px',
              fontWeight: '800',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #a8aeff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2',
            }}
          >
            Build Workflows.
            <br />
            Transform Data.
            <br />
            Automate Everything.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '24px auto 40px',
              lineHeight: '1.6',
            }}
          >
            Drag-and-drop node-based workflow builder. Connect transformations, conditions, and outputs to create powerful data pipelines without writing code.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--gradient-brand)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              }}
            >
              Start Building Free
            </motion.button>

            <motion.button
              onClick={() => handleScrollTo('how-it-works')}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-indigo)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                padding: '14px 30px',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              See How It Works
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Hero Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            right: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '400px',
            height: '400px',
            opacity: 0.3,
          }}
        >
          <Hero3D />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── FEATURES SECTION ─────────────────────────────────────────── */}
      <section
        id="features"
        style={{
          padding: '120px 40px',
          background: 'var(--bg-primary)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: '42px',
                fontWeight: '700',
                marginBottom: '16px',
              }}
            >
              Powerful Features
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Everything you need to build complex workflows, from simple data transforms to sophisticated branching logic.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: '⚙️',
                title: '12+ Nodes',
                desc: 'Input, transform, condition, and output nodes covering most use cases.',
              },
              {
                icon: '🔓',
                title: 'No Code Required',
                desc: 'Visually build workflows without touching a single line of code.',
              },
              {
                icon: '⚡',
                title: 'Real-Time Results',
                desc: 'See execution results instantly as your workflow runs.',
              },
              {
                icon: '🔐',
                title: 'Secure & Private',
                desc: 'JWT authentication, encrypted tokens, user-isolated workflows.',
              },
              {
                icon: '📊',
                title: 'Data Transforms',
                desc: 'JSON parsing, text manipulation, string operations, comparisons.',
              },
              {
                icon: '🌍',
                title: 'Free Forever',
                desc: 'No credit card required. Unlimited workflows for personal use.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)' }}
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '32px',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── HOW IT WORKS ─────────────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{
          padding: '120px 40px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #15151f 100%)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>
              How It Works
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {[
              { step: '01', title: 'Create Workflow', desc: 'Start with a blank canvas or import an existing workflow.' },
              { step: '02', title: 'Drag & Connect', desc: 'Drag nodes onto the canvas and connect them with edges.' },
              { step: '03', title: 'Configure Nodes', desc: 'Set up inputs, transforms, conditions, and outputs.' },
              { step: '04', title: 'Execute & Debug', desc: 'Run your workflow and see real-time results with error tracking.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                style={{
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '16px',
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── SHOWCASE SECTION ─────────────────────────────────────────── */}
      <section
        id="showcase"
        style={{
          padding: '120px 40px',
          background: 'var(--bg-primary)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>
              Use Cases
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              From data transformations to complex business logic, Flowboard handles it all.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Data Pipeline',
                desc: 'Transform API responses, clean data, and output to databases.',
                color: 'var(--accent-cyan)',
              },
              {
                title: 'Form Processing',
                desc: 'Validate user input, apply business rules, send confirmations.',
                color: 'var(--accent-indigo)',
              },
              {
                title: 'Report Generation',
                desc: 'Parse JSON, apply conditions, format, and export reports.',
                color: 'var(--accent-emerald)',
              },
              {
                title: 'Automation Workflows',
                desc: 'Combine conditions and transforms for complex automations.',
                color: 'var(--accent-amber)',
              },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'var(--bg-secondary)',
                  border: `2px solid ${useCase.color}`,
                  borderRadius: '12px',
                  padding: '32px',
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: useCase.color,
                    marginBottom: '16px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                  }}
                >
                  {useCase.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  {useCase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── PRICING SECTION ─────────────────────────────────────────── */}
      <section
        id="pricing"
        style={{
          padding: '120px 40px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #15151f 100%)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>
              Pricing
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
              Simple, transparent pricing for everyone
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['Unlimited workflows', 'Up to 50 nodes per workflow', 'Community support', 'Public gallery'],
                cta: 'Get Started',
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '$29',
                period: '/month',
                features: ['Everything in Free', 'Up to 500 nodes per workflow', 'Email support', 'Advanced analytics', 'API access'],
                cta: 'Start Free Trial',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom limits', 'Dedicated support', 'SSO & SAML', 'On-premise option', 'SLA'],
                cta: 'Contact Sales',
                highlighted: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={plan.highlighted ? { scale: 1.05 } : { scale: 1.02 }}
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(24px)',
                  border: plan.highlighted ? '2px solid var(--accent-indigo)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '40px',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                {plan.highlighted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent-indigo)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '42px', fontWeight: '700' }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{plan.period}</span>}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: plan.highlighted ? 'var(--gradient-brand)' : 'transparent',
                    border: plan.highlighted ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    color: plan.highlighted ? 'white' : 'var(--text-primary)',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── FAQs SECTION ─────────────────────────────────────────── */}
      <section
        id="faqs"
        style={{
          padding: '120px 40px',
          background: 'var(--bg-primary)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'Do I need to know how to code?', a: 'No! Flowboard is completely visual. Drag, connect, and run - no code required.' },
              { q: 'What can I do with Flowboard?', a: 'Build data pipelines, automate workflows, transform JSON, validate input, and much more.' },
              { q: 'Is my data secure?', a: 'Yes. All workflows are user-isolated, encrypted, and protected with JWT authentication.' },
              { q: 'Can I export my workflows?', a: 'Yes! Download workflows as JSON to backup or share with your team.' },
              { q: 'Is there an API?', a: 'Pro and Enterprise plans include API access. Free tier can use the visual builder.' },
            ].map((faq, i) => (
              <FAQ key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── CTA SECTION ─────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 40px',
          background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '16px',
              color: 'white',
            }}
          >
            Ready to build smarter workflows?
          </h2>
          <p
            style={{
              fontSize: '18px',
              marginBottom: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '500px',
              margin: '16px auto 32px',
            }}
          >
            Join hundreds of creators building workflows without code.
          </p>
          <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'white',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '8px',
              color: 'var(--accent-indigo)',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Start Building Free
          </motion.button>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── FOOTER ─────────────────────────────────────────── */}
      <footer
        id="footer"
        style={{
          padding: '60px 40px 40px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Documentation', 'API Docs', 'Tutorials', 'Community'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontWeight: '600' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Privacy', 'Terms', 'Security', 'Compliance'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '40px',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px' }}>
            © 2026 Flowboard. All rights reserved. Built with ❤️ for creators.
          </p>
        </div>
      </footer>
    </div>
  );
};

// FAQ Component
const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onClick={() => setIsOpen(!isOpen)}
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ fontSize: '20px' }}
        >
          ▼
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              margin: '16px 0 0 0',
              lineHeight: '1.6',
            }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;
