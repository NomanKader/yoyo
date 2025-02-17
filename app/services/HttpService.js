// src/services/HttpService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigation/navigationService';
import CryptoUtils from '../utils/cryptoUtils';
import {refreshToken} from './authService';
//import {getUniqueId} from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

export const OMSApi = axios.create({
  baseURL: 'http://61.91.120.28:8080/api',
  headers: {'Content-Type': 'application/json'},
});

// Request Interceptor
OMSApi.interceptors.request.use(
  async config => {
    const deviceId = '123e4567-e89b-12d3-a456-426614174000'; // DeviceInfo.getUniqueIdSync(); // Replace with actual device ID retrieval logic
    if (
      config.method !== 'get' &&
      config.data &&
      typeof config.data === 'object' &&
      deviceId
    ) {
      // Check if `amount` exists and encrypt it
      if (config.data.amount) {
        const encryptedAmount = CryptoUtils.encrypt(
          config.data.amount.toString(),
          deviceId,
        );
        config.data.amount = encryptedAmount;
      }
      //console.log('Original config data ', config.data);
      const jsonString = JSON.stringify(config.data);
      const sortedJsonString = [...jsonString].sort().join('');
      // Generate the data signature
      const dataSignature = CryptoUtils.generateDataSignature(
        sortedJsonString,
        deviceId,
      );
      config.data = {...config.data, dataSignature};
    }

    if (__DEV__) {
      console.log('Sending request to:', config.baseURL + config.url);
      console.log('Sending request data:', config.data);
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor with Token Refresh and Network Error Handling
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

OMSApi.interceptors.response.use(
  response => response,
  async error => {
    console.log(error, 'response error');

    const originalRequest = error.config;

    if (!error.response) {
      // Network error occurred
      // const state = await NetInfo.fetch();
      // console.log(state, 'net info');
      // if (!state.isConnected) {
      //   // Device is offline
      //   // Alert.alert(
      //   //   'No Internet Connection',
      //   //   'Please check your network settings.',
      //   // );
      // } else {
      //   // Some other network error
      //   Alert.alert(
      //     'Network Error',
      //     'An unexpected error occurred. Please try again later.',
      //   );
      // }

      return Promise.reject(error);
    }

    /*

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return OMSApi(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const {accessToken} = await refreshToken();
        await AsyncStorage.setItem('OMSApi', accessToken);
        OMSApi.defaults.headers.common['Authorization'] =
          'Bearer ' + accessToken;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return OMSApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await AsyncStorage.removeItem('OMSApi');
        removeAuthHeader();
        navigate('AuthStack');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    */

    // Enhanced Error Logging
    if (error.response) {
      console.error(
        'Response error:',
        error.response.status,
        error.response.data,
      );
    }

    return Promise.reject(error);
  },
);

// Function to set the authorization header dynamically
export async function setAuthHeader() {
  const OMSApi = await AsyncStorage.getItem('OMSApi');
  if (OMSApi) {
    OMSApi.defaults.headers.common['Authorization'] = 'Bearer ' + OMSApi;
  }
}

// Function to remove authorization header
export function removeAuthHeader() {
  delete OMSApi.defaults.headers.common['Authorization'];
}

// Export the API instance and helper functions
export default {
  OMSApi,
  setAuthHeader,
  removeAuthHeader,
};
