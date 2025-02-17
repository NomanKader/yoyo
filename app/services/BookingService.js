import {OMSApi} from './HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const bookingList = async () => {
  try {
    const customerId = await AsyncStorage.getItem('id');
    const response = await OMSApi.get(
      '/bookinglist/GetBookingsByCustomerAndHotel',
      {
        params: {
          customerId: customerId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const reserveBooking = async formData => {
  try {
    const customerId = await AsyncStorage.getItem('id');
    const response = await OMSApi.post(
      '/BookingReservation/reserve_booking_customers',
      formData,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
