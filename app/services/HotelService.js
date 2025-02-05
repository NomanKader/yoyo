import {OMSApi} from './HttpService';

export const hotelList = async () => {
  try {
    const response = await OMSApi.get('/hotel/all');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const hotelSearch = async hotelName => {
  try {
    const response = await OMSApi.get('/Hotel/search', {
      params: {
        hotelName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const hotelFilterSearch = async (
  buildingType = 'hotel',
  roomStyleId,
  minPrice,
  maxPrice,
  hotelName = '',
) => {
  try {
    const response = await OMSApi.post('/Hotel/search_filter_for_customers', {
      buildingType,
      roomStyleId,
      minPrice,
      maxPrice,
      hotelName,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
