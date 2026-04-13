import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authApi from '../api/auth';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
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
      // Decode JWT to get user info
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

  const handleGoogleError = () => {
    setError('Google login failed');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(24px)',
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h1 style={{
          color: 'var(--text-primary)',
          marginBottom: '8px',
          fontSize: '28px',
          fontWeight: '600',
        }}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '32px',
        }}>
          {mode === 'login'
            ? 'Sign in to your Flowboard account'
            : 'Create a new Flowboard account'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid var(--accent-rose)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            color: 'var(--accent-rose)',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {/* Google Sign-In */}
        <div style={{ marginBottom: '24px' }}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'placeholder'}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="dark"
              width="100%"
              text={mode === 'login' ? 'signin_with' : 'signup_with'}
            />
          </GoogleOAuthProvider>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '12px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSubmit}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '14px',
              }}
              disabled={loading}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--gradient-brand)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Mode Toggle */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '14px',
        }}>
          {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-indigo)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
            }}
            disabled={loading}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
