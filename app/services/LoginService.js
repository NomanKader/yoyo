import axios from 'axios';
import constants from '../config/constants';
import { Alert } from 'react-native';
import AccessTokenService from '../helper/AccessTokenService';

const LoginService = async (postBody, navigation,setShowLoading) => {
  console.log("PostBody", postBody); // Log postBody here to verify its contents
  try {
    const res = await axios.post(constants.loginApiUrl, postBody, {
      headers: {
        'Content-Type': 'application/json', // Ensure content type is set correctly
      }
    });
    console.log("Login Infos", res.data);
    if (res.data && res.data.access_token) {      
      AccessTokenService._StoreAccessToken(res.data.access_token);      
      Alert.alert("Info", "Welcome to YoYo");
      setShowLoading(false);
      navigation.navigate('home');      
    } else {
      setShowLoading(false);
      Alert.alert("Error", "Login failed, no access token received");
      console.error("No access token in response", res.data);
    }
  } catch (err) {
    setShowLoading(false);
    Alert.alert("Error", "Login Error");
    console.error("Error at login", err);
  }
};

export default LoginService;
