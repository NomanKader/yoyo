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
      await AccessTokenService._StoreAccessToken(res.data.access_token);      
      Alert.alert("Info", "Welcome to");
      setShowLoading(false);
      navigation.navigate('TabStack');      
    } else {
      setShowLoading(false);
      Alert.alert("Error", "Login failed, no access token received");
      console.error("No access token in response", res.data);
    }
  } catch (err) {
    setShowLoading(false);
    if(err.response.status==503){
      Alert.alert("Error", "Service Temporary Unavailable");
    }
    else if(err.response.status==401){
      Alert.alert("Error", "Credentials are not correct.");
    }
    else{
      Alert.alert("Error", "Unknown Error");
    }
    console.error("Error at Login", err);
  }
};

export default LoginService;
