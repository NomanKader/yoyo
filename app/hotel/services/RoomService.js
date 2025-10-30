// RoomService.js

import HttpService from '../../common/service/HttpService';

export const GetRoomCategory = setData => {
  // const roomData = [
  //   {
  //     id: 1,
  //     roomName: 'Standard Rooms without breakfast',
  //     roomPhoto:
  //       'https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000',
  //     priceKyats: 150000,
  //     numberOfRooms: 50,
  //   },
  //   {
  //     id: 2,
  //     roomName: 'Standard King Rooms',
  //     roomPhoto:
  //       'https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826',
  //     priceKyats: 100000,
  //     numberOfRooms: 22,
  //   },
  //   {
  //     id: 3,
  //     roomName: 'Excutive Rooms',
  //     roomPhoto:
  //       'https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113830.jpg?t=st=1720718345~exp=1720721945~hmac=2beee0e84fb33ef7edadb2274d80a5288e37ed1c480013e35f6a848142f35b76&w=740',
  //     priceKyats: 250000,
  //     numberOfRooms: 5,
  //   },
  //   {
  //     id: 4,
  //     roomName: 'Presidential Suite',
  //     roomPhoto:
  //       'https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000',
  //     priceKyats: 250000,
  //     numberOfRooms: 1,
  //   },
  // ];
  // setData(roomData);
  // return roomData;
};
export const GetAllRoomCategory = async (languageId,hotelId) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      '/room/getallroomcategory',
      {
        headers: {
          languageId: languageId,
          hotelId: hotelId,
        },
      },
    );
    console.log('get all room category:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('get all room category:', error);
    throw error;
  }
}

export const GetRoomList = async ({
  roomCategoryId,
  languageId = 1,
  hotelId = 1,
  page = 1,
  pageSize = 10,
  sortColumn = "id",
  sortOrder = "desc",
  roomNumber,
}) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      "/room/getallroom",
      {
        params: {
          roomCategoryId,
          page,
          pageSize,
          sortColumn,
          sortOrder,
          roomNumber,
        },
        headers: {
          languageId,
          hotelId,
        },
      }
    );

    console.log("get room list response:", response.data);
    return response.data;
  } catch (error) {
    console.error("get room list error:", error);
    throw error;
  }
};


export const GetRoomCreationData = async ({ languageId, hotelId }) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      '/room/getRoomCategoryCreationData',
      {
        headers: {
          languageId: languageId,
          hotelId: hotelId,
        },
      },
    );
    console.log('get room creation data response:', response.data);
    return response.data; // Return success and message
  } catch (error) {
    console.error('get room creation data error:', error);
    throw error;
  }
};

export const CreateRoomCategory = async ({ languageId, hotelId, body }) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/room/createroomcategory',
      body || {},
      {
        headers: {
          'Content-Type': 'application/json',
          languageId: String(languageId),
          hotelId: String(hotelId),
        },
      },
    );
    console.log('create room category:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'create room category error:',
      error?.response?.data || error,
    );
    throw error?.response?.data || error;
  }
};

export const CreateRoom = async ({ languageId, hotelId, body }) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/room/createroom',
      body || {},
      {
        headers: {
          'Content-Type': 'application/json',
          languageId: String(languageId),
          hotelId: String(hotelId),
        },
      },
    );
    console.log('create room :', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'create room  error:',
      error?.response?.data || error,
    );
    throw error?.response?.data || error;
  }
};

const RoomService = {
  GetRoomCategory,
  GetRoomList,
  GetRoomCreationData,
  // CreateRoomCategory,
};

export default RoomService;
