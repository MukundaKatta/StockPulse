import axios from 'axios';
import { API_URL } from './constants';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('sp-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Retry on network errors (max 1 retry)
    const config = error.config;
    if (!config._retry && error.code === 'ERR_NETWORK' && config.method === 'get') {
      config._retry = true;
      await new Promise((r) => setTimeout(r, 1000));
      return api(config);
    }

    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sp-token');
        import('@/stores/appStore').then(({ useAppStore }) => {
          useAppStore.getState().logout();
        });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
