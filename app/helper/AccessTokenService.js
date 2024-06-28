import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';
const _StoreAccessToken = async token => {
  try {
    console.log('Token', token);
    await Keychain.setGenericPassword('token', token);
    console.log('Access Token stored securely');
  } catch (error) {
    console.error('Error storing access token', error);
  }
};
const _GetAccessToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Access Token retrieved:', credentials.password);
      return credentials.password;
    } else {
      console.log('No access token stored');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving access token', error);
    return null;
  }
};
const _TokenValidation = async () => {
  try {
    const token = await _GetAccessToken();
    console.log('Credentials', token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Decoded', decoded);
      if (!decoded || !decoded.exp) {
        return false; // Token is invalid if it doesn't have an expiration
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime; // Return true if token is not expired, otherwise false
    } else {
      return false; // No credentials found
    }
  } catch (error) {
    console.error('Error accessing Keychain:', error);
    return false; // Error case, treat as unauthorized
  }
};
const _ClearKeyChainData = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Keychain data cleared successfully.');
  } catch (error) {
    console.error('Error clearing keychain data:', error);
  }
};
export default {_StoreAccessToken, _GetAccessToken, _TokenValidation,_ClearKeyChainData};
