import axios from 'axios';
import { auth } from '../firebase-config';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const email = auth.currentUser?.email;
  if (email) config.headers['x-admin-email'] = email;
  return config;
});

export default api;
