import {OMSApi} from './HttpService';

export const bookmarkList = async () => {
  try {
    const response = await OMSApi.get('/bookmarks/GetByCustomerId', {
      params: {customerId: 1},
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addBookmark = async hotelId => {
  try {
    const response = await OMSApi.post('/bookmarks/addBookmarks', {
      customerId: 1,
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
    const response = await OMSApi.delete(
      `/bookmarks/RemoveByCustomer?customerId=${1}&hotelId=${hotelId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
