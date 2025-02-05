import {StyleSheet, Text, View, Image} from 'react-native';
import {useState, useEffect} from 'react';
import {CommonStyles} from '../../style/CommonStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import RoomCategoryListComponent from '../../components/List/RoomCategoryListComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import Accordion from '../../components/accordion/Accordion';
import AccordionText from '../../components/accordion/AccordionText';
import AccordionIcons from '../../components/accordion/AccordionIcons';
import SeeMoreComponent from '../../components/screen/SeeMoreComponent';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';
import BottomSheetComponent from '../../components/BottomSheet/BottomSheetComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import discountIcon from '../../assets/icons/discountIcon.png';
import theme from '../../style/colors';
import DummyData from '../../config/DummyData.json';
import {useRoute} from '@react-navigation/native';
import {availableRoomNumberSearch} from '../../services/RoomService';

const RoomDetail = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const route = useRoute();
  const {room_type, hotelId} = route.params || {};

  const fetchRoomNumbers = async () => {
    try {
      const response = await availableRoomNumberSearch(
        room_type.roomTypeID,
        hotelId,
      );
      console.log('fetchRoomNumbers:', JSON.stringify(response, null, 2));
      if (response?.success === true && response.data?.length > 0) {
        setAvailableRooms(response.data);
      } else {
        console.log('No available rooms found');
        setAvailableRooms([]);
      }
    } catch (error) {
      console.error('RoomDetail fetchRoomNumbers Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (showLoading) return;
    setShowLoading(true);
    try {
      // fetchNearbyHotels();
      // fetchBookmarkList();
      fetchRoomNumbers();
    } catch (error) {
      console.error('RoomList useEffect Error:', error);
      throw error;
    } finally {
      setShowLoading(false);
    }

    return () => {
      // Cleanup function to prevent double execution
    };
  }, []);

  if (showLoading) {
    return (
      <>
        <DetailAppBarComponent title="" navigation={navigation} />
        <BookingSkeletonComponent type="Standard Rooms" />
      </>
    );
  }

  const data = DummyData.data;

  const data2 = DummyData.data2;

  const amenities = [
    {icon: 'snowflake-o', text: 'Air conditioner'},
    {icon: 'tv', text: 'Flat screen TV'},
    {icon: 'wifi', text: 'Wifi connection'},
    {icon: 'volume-off', text: 'Soundproofing'},
    {icon: 'tint', text: 'Pool view'},
    {icon: 'bath', text: 'Ensuite bathroom'},
    {icon: 'building-o', text: 'City view'},
    {icon: 'snowflake-o', text: 'Refrigerator'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        list
        ListHeaderComponentStyle={CommonStyles.container}
        ListHeaderComponent={
          <>
            <DetailAppBarComponent
              title="Room Details"
              navigation={navigation}
            />
            <DividerComponent />
            <View style={CommonStyles.scrollViewContainer}>
              <View>
                <CarouselComponent
                  data={data}
                  setShowLoading={setShowLoading}
                  navigation={navigation}
                  carouselType="roomDetail"
                />
                <Text style={CommonStyles.subTitle}>
                  {room_type.roomTypeName}
                </Text>
                <Text style={CommonStyles.text}>
                  <Text style={styles.boldText}>7</Text> rooms,
                  <Text style={styles.boldText}>
                    {room_type.availableRoomCount}
                  </Text>{' '}
                  available rooms
                </Text>
              </View>

              <Accordion
                title="Basic"
                content={
                  <FlatList
                    data={amenities}
                    keyExtractor={item => item.text}
                    numColumns={2}
                    renderItem={({item}) => (
                      <AccordionIcons icon={item.icon} text={item.text} />
                    )}
                  />
                }
              />
              <Accordion
                title="Bedroom View"
                content={
                  <AccordionText text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                }
              />
              <Accordion
                title="Bathroom View"
                content={
                  <AccordionText text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                }
              />
              <Accordion
                title="View"
                content={
                  <AccordionText text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                }
              />

              <SeeMoreComponent
                title={`Avaliable Rooms(${room_type.availableRoomCount})`}
                onPress={() => navigation.navigate('RoomListAllScreen')}
              />

              <RoomCategoryListComponent
                data={availableRooms}
                navigation={navigation}
                type=""
                onPress={() => setVisible(true)}
              />

              <BottomSheetComponent
                title="Do you know?"
                isVisible={visible}
                onClose={() => setVisible(false)}
                snapPoints={['50%', '70%']}>
                <View style={styles.bottomSheetContent}>
                  <View style={styles.imgContainer}>
                    <Image source={discountIcon} style={styles.image} />
                  </View>
                  <Text style={styles.bottomSheetText}>
                    Booking with an account is 10% discount on reservation.
                  </Text>
                  <DefaultButtonComponent
                    title="Book with an account"
                    backgroundColor={theme.colors.primary}
                    color={theme.colors.textLight}
                    otherStyle={styles.bookButton}
                    onPress={() =>
                      navigation.navigate('AppStack', {
                        screen: 'ReservationFormScreen',
                        params: {roomTypeId: room_type.roomTypeID, hotelId},
                      })
                    }
                  />
                  <DefaultButtonComponent
                    title="Book without account"
                    backgroundColor={theme.colors.textLightGray}
                    color={theme.colors.textDark}
                    otherStyle={styles.bookButton}
                    onPress={() =>
                      navigation.navigate('AppStack', {
                        screen: 'ReservationFormScreen',
                      })
                    }
                  />
                </View>
              </BottomSheetComponent>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default RoomDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 90,
    height: 90,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetText: {
    height: 110,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  bookButton: {
    height: 60,
    borderRadius: 30,
  },
});
