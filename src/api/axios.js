// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401 || !localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  );access_token

export default api;
 