import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const client = axios.create({ baseURL: BASE });

export const api = {
  // Workflows
  list:       ()         => client.get('/api/workflows'),
  get:        (id)       => client.get(`/api/workflows/${id}`),
  create:     (data)     => client.post('/api/workflows', data),
  update:     (id, data) => client.put(`/api/workflows/${id}`, data),
  remove:     (id)       => client.delete(`/api/workflows/${id}`),
  execute:    (id)       => client.post(`/api/workflows/${id}/execute`),

  // Node types
  getNodeTypes: ()       => client.get('/api/node-types'),

  // Health
  health:     ()         => client.get('/api/health'),
};
