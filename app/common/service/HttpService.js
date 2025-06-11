import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://www.12zay.com/axtrahoteladminapi/api';

const techForgeAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

techForgeAPI.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

techForgeAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Prevent infinite loop by marking the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Remove token and clear auth header
      await AsyncStorage.removeItem('token');
      removeAuthHeader();

      return Promise.reject({
        message: 'Unauthorized, please login again.',
        status: 401,
      });
    }

    // Handle other errors gracefully
    return Promise.reject(
      error.response?.data || {
        message: error.message || 'Something went wrong!',
      }
    );
  }
);

export const setAuthHeader = async () => {
  const token = await AsyncStorage.getItem('techForgeToken');
  if (token) {
    techForgeAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete techForgeAPI.defaults.headers.common['Authorization'];
};

export default {
  techForgeAPI,
  setAuthHeader,
  removeAuthHeader,
};
