// RoomService.js

export const GetRoomCategory = (setData) => {
  const roomData = [
    {
      id: 1,
      roomName: "Deluxe Room",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000",
      priceKyats: 150000
    },
    {
      id: 2,
      roomName: "Standard Room",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826",
      priceKyats: 100000
    },
    {
      id: 3,
      roomName: "Suite Room",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113830.jpg?t=st=1720718345~exp=1720721945~hmac=2beee0e84fb33ef7edadb2274d80a5288e37ed1c480013e35f6a848142f35b76&w=740",
      priceKyats: 250000
    },
    {
      id: 4,
      roomName: "Suite Room",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000",
      priceKyats: 250000
    }
  ];
  setData(roomData);
};

export const GetRoomList = (setData) => {
  const roomData = [
    {
      id: 1,
      roomNumber: "Room 406",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000",
      roomCategory: "Deluxe Room",
      roomStatus:"Occupied"
    },
    {
      id: 2,
      roomNumber: "Room 507",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826",
      roomCategory: "Standard Room",
      roomStatus:"Vacant"
    },
    {
      id: 3,
      roomNumber: "Room 806",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113830.jpg?t=st=1720718345~exp=1720721945~hmac=2beee0e84fb33ef7edadb2274d80a5288e37ed1c480013e35f6a848142f35b76&w=740",
      roomCategory: "Suite Room",
      roomStatus:"Occupied"
    },
    {
      id: 4,
      roomNumber: "Room 206",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113862.jpg?t=st=1720716723~exp=1720720323~hmac=490124f9c0c6aaef8961afaa2f6b5f325ef5bec5fcaa13a3d293a577932cd48e&w=2000",
      roomCategory: "Royal Room",
      roomStatus:"Vacant"
    }
  ];
  setData(roomData);
};

const RoomService = { GetRoomCategory, GetRoomList };

export default RoomService;
