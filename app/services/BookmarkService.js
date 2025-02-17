import {OMSApi} from './HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bookmarkList = async () => {
  try {
    const customerId = await AsyncStorage.getItem('id');
    console.log(customerId);
    const response = await OMSApi.get('/bookmarks/GetByCustomerId', {
      params: {customerId: customerId},
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addBookmark = async hotelId => {
  try {
    const customerId = await AsyncStorage.getItem('id');
    const response = await OMSApi.post('/bookmarks/addBookmarks', {
      customerId: customerId,
      hotelId,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const removeBookmark = async hotelId => {
  console.log('removeBookmark:', hotelId);
  try {
    const customerId = await AsyncStorage.getItem('id');
    const response = await OMSApi.delete(
      `/bookmarks/RemoveByCustomer?customerId=${customerId}&hotelId=${hotelId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
