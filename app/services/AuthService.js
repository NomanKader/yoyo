// src/services/authService.js
import axios from 'axios';
import httpService from './HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoUtils from '../utils/cryptoUtils';
import DeviceInfo from 'react-native-device-info';

// Login Function
export const login = async (mobile, passcode) => {
  try {
    const response = await httpService.OMSApi.post('/auth/login', {
      mobile,
      passcode,
    });
    console.log('Encrypt Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Encrypt Login error:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  const deviceId = '123e4567-e89b-12d3-a456-426614174000'; // DeviceInfo.getUniqueIdSync(); // '123e4567-e89b-12d3-a456-426614174000'; // Replace with your actual function to get deviceId
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const accessToken = await AsyncStorage.getItem('techForgeToken');
  console.log('access', accessToken);
  console.log('refresh', refreshToken);
  if (!refreshToken || !accessToken) {
    throw new Error('No refresh token or access token available');
  }

  const payload = {
    accessToken,
    refreshToken,
  };
  const jsonString = JSON.stringify(payload);
  const sortedJsonString = [...jsonString].sort().join('');
  // Generate dataSignature
  // const dataSignature = CryptoUtils.generateDataSignature(
  //   sortedJsonString,
  //   deviceId,
  // );

  try {
    const response = await axios.post(
      'https://bms-dev.atlasicloud.com/api/mca/auth/refresh-token',
      {
        ...payload,
        dataSignature,
      },
    );
    console.log('refresh token result ', response.data);
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    if (!newAccessToken || !newRefreshToken) {
      throw new Error('Invalid response from refresh-token endpoint');
    }

    await AsyncStorage.setItem('techForgeToken', newAccessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);

    return {accessToken: newAccessToken, refreshToken: newRefreshToken};
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error refreshing token:', error.message);
    }

    throw error; // Ensure the calling function knows it failed
  }
};

// Request OTP Function
export const requestOTP = async mobileNo => {
  try {
    const response = await httpService.OMSApi.post(
      '/request-otp?MobileNo=' + mobileNo,
    );
    console.log('Request OTP response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('Request OTP error:', error);
    throw error;
  }
};

export const verifyOTP = async (mobileNo, otp) => {
  try {
    const response = await httpService.OMSApi.post(
      '/verify-otp?MobileNo=' + mobileNo + '&otpValue=' + otp,
    );
    console.log('Verify OTP response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
};

export const getBusinessType = async () => {
  try {
    const response = await httpService.OMSApi.get(
      '/master-data/gac/businesstype',
    );
    console.log('Business Type response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Business Type error:', error);
    throw error;
  }
};

export default {
  login,
  refreshToken,
  requestOTP,
  getBusinessType,
  verifyOTP,
};
