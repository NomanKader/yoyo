import {OMSApi} from './HttpService';

export const bookingList = async () => {
  try {
    const response = await OMSApi.get(
      '/bookinglist/GetBookingsByCustomerAndHotel',
      {
        params: {
          customerId: 1,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
