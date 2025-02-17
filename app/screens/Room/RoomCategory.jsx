import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {CommonStyles} from '../../style/CommonStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import RoomCategoryListComponent from '../../components/List/RoomCategoryListComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import SeeMoreComponent from '../../components/screen/SeeMoreComponent';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';
import DummyData from '../../config/DummyData.json';
import {FlatList} from 'react-native-gesture-handler';
import FormikDateInputComponent from '../../components/Formik/FormikDateInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import {useRoute} from '@react-navigation/native';
import {availableRoomTypeSearch} from '../../services/RoomService';
import DatePickerInputComponent from '../../components/DatePicker/DatePickerComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomCategory = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomTypes, setRoomTypes] = useState([]);

  const route = useRoute();
  const {hotel, id} = route.params || {};
  console.log('hotelId:', id);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      // Cleanup function to prevent double execution
    };
  }, []);

  const data = DummyData.data;

  const data2 = DummyData.data2;

  const formatDate = date => {
    const fomattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(date.getDate()).padStart(2, '0')}`
      : date;
    return fomattedDate;
  };

  const availableRoomSearch = async () => {
    setShowLoading(true);

    try {
      const response = await availableRoomTypeSearch(
        id,
        formatDate(startDate),
        formatDate(endDate),
      );
      console.log('availableRoomSearch:', response.data);
      await AsyncStorage.setItem('startDate', JSON.stringify(startDate));
      if (response?.success === true && response.data?.length > 0) {
        console.log(response.data);
        setRoomTypes(response.data);
        const roomTypes = response.data.map(room => ({
          label: room.roomTypeName,
          value: room.roomID,
        }));
        console.log('roomTypes', roomTypes);
        await AsyncStorage.setItem('roomTypes', JSON.stringify(roomTypes));
      }
    } catch (error) {
      console.error('availableRoomSearch Error:', error);
      setRoomTypes([]);
    } finally {
      setShowLoading(false);
    }
  };

  if (showLoading) {
    return (
      <>
        <DetailAppBarComponent
          title={hotel.hotelName}
          navigation={navigation}
        />
        <BookingSkeletonComponent />
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={CommonStyles.container}>
        <DetailAppBarComponent
          title={hotel.hotelName}
          navigation={navigation}
        />
        <DividerComponent />
        <FlatList
          ListHeaderComponent={
            <>
              <View>
                <CarouselComponent
                  data={data}
                  setShowLoading={setShowLoading}
                  navigation={navigation}
                  carouselType="roomList"
                />
                <Text style={CommonStyles.subTitle}>{hotel.hotelName}</Text>
                <Text style={CommonStyles.text}>{hotel.address}</Text>
                <Text style={[styles.text, styles.t20]}>
                  {hotel.description}
                </Text>

                <View style={styles.t20}>
                  <Text>Choose Booking Date</Text>
                  <View style={styles.row}>
                    <View style={styles.dateCont}>
                      <DatePickerInputComponent
                        title="Start Date"
                        date={startDate}
                        setDate={setStartDate}
                      />
                    </View>
                    <View style={styles.dateCont}>
                      <DatePickerInputComponent
                        title="End Date"
                        date={endDate}
                        setDate={setEndDate}
                      />
                    </View>
                  </View>
                  <DefaultButtonComponent
                    title="Search"
                    backgroundColor={theme.colors.primary}
                    onPress={availableRoomSearch}
                  />
                </View>
              </View>

              <SeeMoreComponent
                title="Room Categories"
                onPress={() => navigation.navigate('RoomCategoryAllScreen')}
              />
              <RoomCategoryListComponent
                data={roomTypes}
                navigation={navigation}
                type="category"
                hotelId={id}
                // onPress={() => {}}
              />
            </>
          }
          ListHeaderComponentStyle={CommonStyles.scrollViewContainer}
        />
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default RoomCategory;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  dateCont: {
    width: '50%',
    padding: 3,
  },
  t20: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: theme.colors.textDark,
  },
});
