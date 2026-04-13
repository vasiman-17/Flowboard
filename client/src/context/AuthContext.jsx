import React, { createContext, useState, useCallback, useEffect } from 'react';
import { setupAxiosInterceptors } from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('flowboard_token');
    const storedUser = localStorage.getItem('flowboard_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to restore session:', err);
        localStorage.removeItem('flowboard_token');
        localStorage.removeItem('flowboard_user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = useCallback((newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('flowboard_token', newToken);
    localStorage.setItem('flowboard_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('flowboard_token');
    localStorage.removeItem('flowboard_user');
  }, []);

  // Set up axios interceptors when token changes
  useEffect(() => {
    setupAxiosInterceptors(token, logout);
  }, [token, logout]);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
