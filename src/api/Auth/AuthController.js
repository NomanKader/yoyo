import { PostAPI } from '../CommonController';

export const LoginAPI = async (postBody) => {    
  const res = await PostAPI(`Auth/login-by-phone`, postBody);    
  return res;
};

export const RegisterAPI = async (postBody) => {
  const res = await PostAPI(`auth/register-customers`, postBody);  
  return res;
};

export const ResendOTP = async (postBody) => {
  const res = await PostAPI(`Auth/send-otp`, postBody);  
  return res;
};

export const VerifyOTP = async (postBody) => {
  const res = await PostAPI(`auth/verify-otp`, postBody);  
  return res;
};

