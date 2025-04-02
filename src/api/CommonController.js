import axios from 'axios';
import configData from '../constants/configData';
const apiUrl = configData.isProduction
  ? configData.prodAPIUrl
  : configData.devAPIUrl;
export const GetAPI = async apiPath => {
  try {
    console.log("apiPAth",apiPath);
    const res = await axios.get(`${apiUrl}` + apiPath);
    return {
      status: res?.data?.success,
      message: res?.data?.message,
      data: res?.data?.data,
    };
  } catch (err) {
    console.error('GET API Error:', err?.response?.data);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};

export const PostAPI = async (apiPath,postBody) => {
  try {    
    console.log("apiPAth",apiPath);
    console.log("PostBody",postBody);
    const res = await axios.post(`${apiUrl}` + apiPath, postBody);
    return {
      status: res?.data?.success,
      message: res?.data?.message,
      data: res?.data?.data,
    };
  } catch (err) {
    console.error('POST Error :', err);
    return {
      status: err?.response?.data?.success || false,
      message: err?.response?.data?.message || 'An error occurred',
    };
  }
};
