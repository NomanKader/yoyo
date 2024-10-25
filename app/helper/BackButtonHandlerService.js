import { BackHandler } from "react-native";
const _BackHandlerService=()=>{
    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // Return true to disable the back button functionality
          return true;
        }
      );
  
      return () => {
        backHandler.remove(); // Clean up the event listener on unmount
      };
}
export default _BackHandlerService;