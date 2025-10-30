import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import { CommonStyles } from "../../style/CommonStyles";
import AppBarComponent from "../../components/AppBar/AppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import { GetRoomList } from "../../services/RoomService";
import RoomListComponent from "../../components/List/RoomListComponent";

export default function RoomListScreen({ navigation, route }) {
  const { id } = route.params || {};
  const [roomList, setRoomList] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await GetRoomList({
          roomCategoryId: id,
          page: 1,
          pageSize: 10,
          sortColumn: "id",
          sortOrder: "desc",
        });
        console.log("get room list respone", JSON.stringify(response?.data?.rooms))
        setRoomList(response?.data?.rooms ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoading(false);
      }
    };

    getAllRooms();
  }, []);

  return (
    <View style={CommonStyles.room.container}>
      <AppBarComponent
        title={"Room List"}
        navigation={navigation}
        showBackIcon={true}
        onPressBack={() => navigation.goBack()}
        onAddIconPress={() => navigation.navigate("AppStack",{screen:"CreateNewRoom",params:{
          id: id
        }})}
      />
      <DividerComponent />

      {showLoading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : roomList.length === 0 ? (
        <View style={CommonStyles.scrollViewContainer}>
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" }}>
            No rooms available
          </Text>
        </View>
      ) : (
        <RoomListComponent data={roomList} navigation={navigation} />
      )}
    </View>
  );
}
