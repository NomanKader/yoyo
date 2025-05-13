import { View } from "react-native";
import { CommonStyles } from "../../style/CommonStyles";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import RoomListComponent from "../../components/List/BookingListComponent";
export default function BookingRoomListScreen({ navigation, route }) {
  // Get the title from route.params
  const { title } = route.params;
  console.log("Title is ",title);

  return (
    <View style={CommonStyles.scrollViewContainer}>
      {/* Pass the title from route.params to the DetailAppBarComponent */}
      <DetailAppBarComponent title={title} navigation={navigation} />
      <DividerComponent />
        {showLoading ? (
          <View style={CommonStyles.scrollViewContainer}>
            <ListSkeletonComponent />
            <ListSkeletonComponent />
          </View>            
        ) : (  
          <RoomListComponent data={roomData} navigation={navigation} type={type} onPress={()=>_handleListService(type,setType,navigation,RoomService,setRoomData)}/>        
        )}
    </View>
  );
}
