// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
