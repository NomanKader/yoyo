import axios from 'axios';
import configData from '../../constants/configData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginAPI = async (postBody) => {
  console.log("Request Body:", postBody);
  const apiUrl = configData.isProduction ? configData.prodAPIUrl : configData.devAPIUrl;
  try {
    const res = await axios.post(`${apiUrl}Auth/login-by-phone`, postBody);  
    console.log("Response LoginAPI:", res.data);    
    AsyncStorage.setItem('jwt',JSON.stringify(res.data.data.token))
    return {
      status: res.data.success,
      message: res.data.message,
    };
  } catch (err) {
    console.error("Login API Error:", err?.response?.data);
    return {
      status: err?.response?.data?.success || false,  // Prevents crashing if response is undefined
      message: err?.response?.data?.message || "An error occurred",
    };
  }
};

export const RegisterAPI = async (postBody) => {
  console.log("Request Body:", postBody);
  const apiUrl = configData.isProduction ? configData.prodAPIUrl : configData.devAPIUrl;
  try {
    const res = await axios.post(`${apiUrl}auth/register-customers`, postBody);  
    console.log("Response RegisterAPI:", res.data);    
    return {
      status: res.data.success,
      message: res.data.message,
    };
  } catch (err) {
    console.error("Register API Error:", err?.response?.data);
    return {
      status: err?.response?.data?.success || false,  // Prevents crashing if response is undefined
      message: err?.response?.data?.message || "An error occurred",
    };
  }
};

export const ResendOTP = async (postBody) => {
  console.log("Request Body:", postBody);
  const apiUrl = configData.isProduction ? configData.prodAPIUrl : configData.devAPIUrl;
  try {
    const res = await axios.post(`${apiUrl}Auth/send-otp`, postBody);  
    console.log("Response resendOTP:", res.data);    
    return {
      status: res.data.success,
      message: res.data.message,
    };
  } catch (err) {
    console.error("Resend OTP  API Error:", err?.response?.data);
    return {
      status: err?.response?.data?.success || false,  
      message: err?.response?.data?.message || "An error occurred",
    };
  }
};

export const VerifyOTP = async (postBody) => {
  console.log("Request Body:", postBody);
  const apiUrl = configData.isProduction ? configData.prodAPIUrl : configData.devAPIUrl;
  try {
    const res = await axios.post(`${apiUrl}auth/verify-otp`, postBody);  
    console.log("Response verifyOTP:", res.data);    
    return {
      status: res.data.success,
      message: res.data.message,
    };
  } catch (err) {
    console.error("Resend OTP  API Error:", err?.response?.data);
    return {
      status: err?.response?.data?.success || false,  
      message: err?.response?.data?.message || "An error occurred",
    };
  }
};

