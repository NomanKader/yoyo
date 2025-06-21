import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HttpService from './HttpService';

// export const refreshToken = async () => {
//   const refreshToken = await AsyncStorage.getItem('refreshToken');
//   const accessToken = await AsyncStorage.getItem('techForgeToken');

//   if (!refreshToken || !accessToken) {
//     throw new Error('No refresh token or access token available');
//   }

//   try {
//     const response = await axios.post(
//       'https://bms-sit.atlasicloud.com/api/mca/auth/refresh-token',
//       {
//         accessToken,
//         refreshToken,
//       },
//     );

//     const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
//       response.data;

//     if (!newAccessToken || !newRefreshToken) {
//       throw new Error('Invalid response from refresh-token endpoint');
//     }

//     await AsyncStorage.setItem('techForgeToken', newAccessToken);
//     await AsyncStorage.setItem('refreshToken', newRefreshToken);

//     return {accessToken: newAccessToken, refreshToken: newRefreshToken};
//   } catch (error) {
//     console.error(
//       'Token refresh failed:',
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// };

export const RequestOTP = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/sendotp',
      postBody,
    );
    console.log('Request OTP response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Request OTP error:', error);
    throw error;
  }
};

export const VerifyOTp = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/verifyotp',
      postBody,
    );
    console.log('verify otp response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('verify OTP error:', error);
    throw error;
  }
};

export const Register = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/register',
      postBody,
    );
    console.log('register response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('register error:', error);
    throw error;
  }
};

export const CheckUser = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/checkuser',
      postBody,
    );
    console.log('check user response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('check usre error:', error);
    throw error;
  }
};

export const Login = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/login',
      postBody,
    );
    console.log('login response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('login error:', error);
    throw error;
  }
};

export const ForgetPassword = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/forgetpassword',
      postBody,
    );
    console.log('forget password response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('forget password error:', error);
    throw error;
  }
};

export const ChangePassword = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/changePasssword',
      postBody,
    );
    console.log('change password response:', response.data);
    return response.data;
  } catch (error) {
    console.error('change password error:', error);
    throw error;
  }
};

export const ResetPassword = async postBody => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/auth/resetpassword',
      postBody,
    );
    console.log('reset password response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('reset password error:', error);
    throw error;
  }
};

