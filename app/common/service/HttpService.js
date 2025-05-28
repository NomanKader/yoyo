import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://www.12zay.com/axtrahoteladminapi/api';

const techForgeAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

techForgeAPI.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('techForgeToken');
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

    if (error.response?.status === 401 && !originalRequest.skipAuth) {
      await AsyncStorage.removeItem('techForgeToken');
      removeAuthHeader();
      return Promise.reject({message: 'Unauthorized, please login again.'});
    }

    return Promise.reject(error.response?.data || error);
  },
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
