import axios from "axios";
const GetBookingAPI=async(setData)=>{
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
      roomDate:"13-01-2024",
      roomStatus:"Unpaid"
    },
    {
      id: 2,
      roomNumber: "Room 507",
      roomPhoto: "https://img.freepik.com/free-photo/small-juvenile-bedroom-arrangement_23-2151113819.jpg?t=st=1720716702~exp=1720720302~hmac=66d97baf2a495d79a00fc446dea1b5a899e7bc19face4a8d1807748792c88dee&w=826",
      roomCategory: "CAL8729203939",
      roomDate:"13-01-2024",
      roomStatus:"Paid"
    }
  ];
  setData(roomData);
};
export  {GetBookingAPI,GetBookingListAPI};