import HttpService from '../../common/service/HttpService';

export const RequestFacility = async ({ price, descriptions }) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/facility/requestFacility',
      {
        price,
        descriptions, // Example: [{ langaugeId: 1, facilityName: "test" }]
      }
    );

    console.log('requestFacility response:', response.data);
    return response.data;
  } catch (error) {
    console.error('requestFacility error:', error);
    throw error;
  }
};
