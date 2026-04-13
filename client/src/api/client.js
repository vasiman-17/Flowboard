import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: BASE,
});

// This function should be called after user logs in
export const setupAxiosInterceptors = (token, logout) => {
  // Request interceptor: Add Authorization header
  client.interceptors.request.clear();
  client.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: Handle 401 and token expiry
  client.interceptors.response.clear();
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default client;
