import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',  // Asegúrate de usar el puerto correcto de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
