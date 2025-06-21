import HttpService from '../../common/service/HttpService';

export const GetAllFacilities = async ({languageId, hotelId}) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      '/facility/getallfacility',{
       headers: {
           languageId:languageId,
           hotelId:hotelId
        }
      }
    );
    console.log('get all facilites response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('get all facilites error:', error);
    throw error;
  }
};
