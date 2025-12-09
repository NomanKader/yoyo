import { FlatList, Text, View } from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { GetAllRoomCategory } from '../../services/RoomService';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import BookingRoomCategoryListComponent from '../../components/List/BookingRoomCategoryListComponent';

export default function BookingRoomCategoryScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const { language } = useContext(LanguageContext);
  const { translate } = useContext(LanguageContext);
  const [checkInDate, setCheckInDate] = useState(null);   // store as Date
  const [checkOutDate, setCheckOutDate] = useState(null); // store as Date
  const [refreshing, setRefreshing] = useState(false);

  const fetchRoomList = useCallback(async () => {
    setShowLoading(true);
    try {
      const response = await GetAllRoomCategory(1, 1);
      if (response.success) {
        setRoomData(response?.data?.roomCategories || []);
      }
    } finally {
      setShowLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoomList();
  }, [fetchRoomList]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await GetAllRoomCategory(1, 1);
      if (response.success) {
        setRoomData(response?.data?.roomCategories || []);
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 20, backgroundColor: 'white' }}>
      <DetailAppBarComponent title={'Choose Booking'} navigation={navigation} />
      <DividerComponent />

      <View style={{ gap: 10, marginTop: 10 }}>
        <View style={{ gap: 5 }}>
          <Text style={CommonStyles.infoLabel}>Check In Date</Text>
          <CustomDatePicker
            value={checkInDate}
            onChange={setCheckInDate}
            placeholder="Select check-in date"
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={CommonStyles.infoLabel}>Check Out Date</Text>
          <CustomDatePicker
            value={checkOutDate}
            onChange={setCheckOutDate}
            placeholder="Select check-out date"
          />
        </View>
      </View>

      {showLoading ? (
        <View>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={[CommonStyles.infoLabel, { marginTop: 20 }]}>
            Select Room Category
          </Text>
          <FlatList
            data={roomData}
            style={{ marginHorizontal: -16 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BookingRoomCategoryListComponent
                item={item}
                navigation={navigation}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
    </View>
  );
}
