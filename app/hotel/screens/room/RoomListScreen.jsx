import React, { useEffect, useState, useCallback } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = async () => {
    try {
      const response = await GetRoomList({
        roomCategoryId: id,
        page: 1,
        pageSize: 10,
        sortColumn: "id",
        sortOrder: "desc",
      });
      setRoomList(response?.data?.rooms ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRooms();
  }, []);

  const renderItem = useCallback(({ item }) => (
    <RoomListComponent data={[item]} navigation={navigation} />
  ), [navigation]);

  const ListEmptyComponent = useCallback(() => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "gray" }}>No rooms available</Text>
    </View>
  ), []);

  if (showLoading) {
    return (
      <View style={CommonStyles.room.container}>
        <AppBarComponent
          title={"Room List"}
          navigation={navigation}
          showBackIcon={true}
          onPressBack={() => navigation.goBack()}
          onAddIconPress={() =>
            navigation.navigate("AppStack", {
              screen: "CreateNewRoom",
              params: { id: id },
            })
          }
        />
        <DividerComponent />
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      </View>
    );
  }

  return (
    <View style={CommonStyles.room.container}>
      <AppBarComponent
        title={"Room List"}
        navigation={navigation}
        showBackIcon={true}
        onPressBack={() => navigation.goBack()}
        onAddIconPress={() =>
          navigation.navigate("AppStack", {
            screen: "CreateNewRoom",
            params: { id: id },
            })
        }
      />
      <DividerComponent />
      
      <FlatList
        data={roomList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={roomList.length === 0 ? { flex: 1 } : {}}
      />
    </View>
  );
}