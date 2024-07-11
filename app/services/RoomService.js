import axios from "axios";
const GetRoomCategory=(setData)=>{
    //fake room category data
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
        // Add more rooms as needed
      ];
      setData(roomData);
}
export default GetRoomCategory;