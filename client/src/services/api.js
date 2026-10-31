import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchServices = () => api.get('/services').then((r) => r.data.data);

export const fetchRules = (serviceId) => api.get(`/rules/${serviceId}`).then((r) => r.data.data);

export const runCheck = (payload) => api.post('/check', payload).then((r) => r.data);

export default api;
