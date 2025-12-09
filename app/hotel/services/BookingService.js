import axios from "axios";
import HttpService from '../../common/service/HttpService';

const GetBookingAPI = async (setData) => {
  setData([
    {
      "albumId": 1,
      "id": 1,
      "url": "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000"
    },
    {
      "albumId": 1,
      "id": 2,
      "url": "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826"
    },
    {
      "albumId": 1,
      "id": 3,
      "url": "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113830.jpg?t=st=1720718345~exp=1720721945~hmac=2beee0e84fb33ef7edadb2274d80a5288e37ed1c480013e35f6a848142f35b76&w=740"
    }]);
}
const GetBookingListAPI = (setData) => {
  const roomData = [
    {
      id: 1,
      roomNumber: "Room 406",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000",
      roomCategory: "CAL8729203939",
      roomDate: "13-01-2024",
      roomStatus: "Unpaid"
    },
    {
      id: 2,
      roomNumber: "Room 507",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826",
      roomCategory: "CAL8729203939",
      roomDate: "13-01-2024",
      roomStatus: "Paid"
    }
  ];
  setData(roomData);
};


export const CreateBooking = async (languageId, body) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      "/booking/create",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          languageId: String(languageId),

        },
      }
    );

    console.log("create booking :", response.data);
    return response.data;

  } catch (error) {
    console.error(
      "create booking error:",
      error?.response?.data || error
    );
    throw error?.response?.data || error;
  }
};


export const GetBookingList = async (status) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      "booking/getList",
      {
        params: {
          page: 1,
          pageSize: 10,
          sortColumn: "id",
          sortOrder: "desc",
          status: status,
        },
        headers: {
          languageId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Booking list:", JSON.stringify(response.data));
    return response.data.data.bookings;
  } catch (error) {
    console.error("Get booking list error:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const GetBookingById = async (id) => {
  try {
    const response = await HttpService.techForgeAPI.get(
      `booking/getById/${id}`,
      {
        headers: {
          languageId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Booking detail:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    console.error("Get booking by id error:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const CheckIn = async (bookingId) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      `booking/checkIn/${bookingId}`,
      {
        headers: {
          languageId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("check in response:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    console.error("check in respone:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const CheckOut = async (bookingId) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      `booking/checkOut/${bookingId}`,
      {
        headers: {
          languageId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("check out response:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    console.error("check out respone:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const GetAllAddOn = async () => {
  try {
    const response = await HttpService.techForgeAPI.get(
      `facility/getAllAddOn`,
      {
        headers: {
          languageId: 1,
          hotelId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("get All add on:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    console.error("get all add on:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const CreateAddOn = async (body) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      `facility/createAddOn`,
      body,
      {
        headers: {
          languageId: 1,
          hotelId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Create AddOn:", JSON.stringify(response.data));
    return response.data;

  } catch (error) {
    console.error("Create AddOn error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const DeleteAddOn = async (id) => {
  try {
    const response = await HttpService.techForgeAPI.delete(
      `facility/deleteAddOn/${id}`,
      {
        headers: {
          languageId: 1,
          hotelId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Delete AddOn response:", response.data);
    return response.data;
  } catch (error) {
    console.error("DeleteAddOn error:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

export const UpdateAddOn = async (body) => {
  try {
    const response = await HttpService.techForgeAPI.post(
      "facility/updateAddOn",
      body,
      {
        headers: {
          languageId: 1,
          hotelId: 1,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Update AddOn:", response.data);
    return response.data;
  } catch (error) {
    console.error("UpdateAddOn error:", error?.response?.data || error);
    throw error?.response?.data || error;
  }
};





export { GetBookingAPI, GetBookingListAPI };