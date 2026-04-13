import client from './client';

const authApi = {
  // Google OAuth login
  googleLogin: async (googleId, email, name, profilePicture) => {
    const response = await client.post('/api/auth/google', {
      googleId,
      email,
      name,
      profilePicture,
    });
    return response.data;
  },

  // Email signup
  emailSignup: async (email, name, password) => {
    const response = await client.post('/api/auth/register', {
      email,
      name,
      password,
    });
    return response.data;
  },

  // Email login
  emailLogin: async (email, password) => {
    const response = await client.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Get current user (protected)
  getCurrentUser: async () => {
    const response = await client.get('/api/auth/me');
    return response.data;
  },

  // Logout (client-side for SPA)
  logout: async () => {
    const response = await client.post('/api/auth/logout');
    return response.data;
  },
};

export default authApi;
