import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API,
  withCredentials: true, // if using Sanctum or cookies
});

export default api;