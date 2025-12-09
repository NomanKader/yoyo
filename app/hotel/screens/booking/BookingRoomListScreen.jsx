import { Text, View, FlatList, Image } from "react-native";
import { CommonStyles } from "../../style/CommonStyles";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import ListSkeletonComponent from "../../components/Skeleton/ListSkeletonComponent";
import { useState, useEffect } from "react";
import BookingRoomListComponent from "../../components/List/BookingRoomListComponent";
import { GetRoomList } from "../../services/RoomService";
import theme from "../../style/colors";

export default function BookingRoomListScreen({ navigation, route }) {
  const { title, checkInDate, checkOutDate, id, pricePerNight } = route.params;

  const [showLoading, setShowLoading] = useState(true); // <-- true at start
  const [roomList, setRoomList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = async () => {
    // Show loading if not refreshing
    if (!refreshing) setShowLoading(true);
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
      setRefreshing(false); // reset refreshing
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const onRefresh = () => {
    setRefreshing(true); // enable refreshing indicator
    fetchRooms();
    setRefreshing(false)
  };

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title={title} navigation={navigation} />
      <DividerComponent />

      {showLoading && !refreshing ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        <FlatList
          data={roomList}
          contentContainerStyle={{ marginHorizontal: -20 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookingRoomListComponent
              item={item}
              navigation={navigation}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              pricePerNight={pricePerNight}
              categoryId={id}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 2,
                backgroundColor: theme.colors.iconBackgroundColor,
                width: '100%',
              }}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() =>
            !showLoading && (
              <View
                style={{
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40,
                }}
              >
                <Image
                  source={require("../../assets/icons/bookingfull.png")} // <-- your PNG
                  style={{ width: 150, height: 150, resizeMode: "contain", marginBottom: 16 }}
                />
                <Text style={{ color: "#000", fontSize: 16 }}>
                  {title} Rooms are full now.
                </Text>
                <Text style={{ color: "#666", fontSize: 16 }}>
                  Please choose other available room category!
                </Text>
              </View>
            )
          }
        />

      )}
    </View>
  );
}      
