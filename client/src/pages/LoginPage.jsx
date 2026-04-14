import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authApi from '../api/auth';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'signup') {
        if (!name) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        result = await authApi.emailSignup(email, name, password);
      } else {
        result = await authApi.emailLogin(email, password);
      }

      login(result.token, result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedJwt = JSON.parse(jsonPayload);

      const result = await authApi.googleLogin(
        decodedJwt.sub,
        decodedJwt.email,
        decodedJwt.name,
        decodedJwt.picture
      );

      login(result.token, result.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#0a0a0f',
      color: '#f0f0f5'
    }}>
      {/* Left Side - Value Prop */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          flex: 1,
          padding: '80px 60px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        <motion.div variants={fadeInUp} style={{ marginBottom: '20px' }}>
          <div
            onClick={() => navigate('/')}
            style={{
              fontSize: '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
              marginBottom: '60px'
            }}
          >
            Flowboard
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}
        >
          Build. Automate. Scale.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          style={{
            fontSize: '18px',
            color: '#a0a0b8',
            marginBottom: '60px',
            lineHeight: '1.7',
            maxWidth: '400px'
          }}
        >
          Create powerful automated workflows with our intuitive visual builder. No coding knowledge required.
        </motion.p>

        <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Execute workflows instantly' },
            { icon: '🔐', title: 'Fully Secure', desc: 'Enterprise-grade encryption' },
            { icon: '🎯', title: 'Easy to Use', desc: 'Drag-and-drop interface' }
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
            >
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: '#a0a0b8' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          flex: 1,
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#151520'
        }}
      >
        <motion.div
          variants={fadeInUp}
          style={{
            width: '100%',
            maxWidth: '420px'
          }}
        >
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '12px'
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p style={{
            color: '#a0a0b8',
            marginBottom: '40px',
            fontSize: '15px'
          }}>
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Create your free account'}
          </p>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid #f43f5e',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                color: '#f43f5e',
                fontSize: '14px'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Google Sign-In */}
          <div style={{ marginBottom: '24px' }}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'placeholder'}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                theme="dark"
                width="420"
                text={mode === 'login' ? 'signin_with' : 'signup_with'}
              />
            </GoogleOAuthProvider>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '12px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
            <span style={{ color: '#6b6b82', fontSize: '13px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSubmit}>
            {mode === 'signup' && (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  marginBottom: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '8px',
                  color: '#f0f0f5',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
            )}

            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginBottom: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '8px',
                color: '#f0f0f5',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6366f1';
                e.target.style.background = 'rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />

            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 14px',
                marginBottom: '28px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '8px',
                color: '#f0f0f5',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6366f1';
                e.target.style.background = 'rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '700',
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          {/* Mode Toggle */}
          <motion.div
            style={{
              marginTop: '24px',
              textAlign: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ color: '#a0a0b8' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <motion.button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
              whileHover={{ color: '#8b5cf6' }}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
