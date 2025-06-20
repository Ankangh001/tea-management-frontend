import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// ✅ Attach Authorization header globally
api.interceptors.request.use(config => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;