import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // permite el envío de cookies
});

export default api;
