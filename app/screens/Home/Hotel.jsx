import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {CommonStyles} from '../../style/CommonStyles';
import BookingSkeletonComponent from '../../components/Skeleton/BookingSkeletonComponent';
import CarouselComponent from '../../components/Caurosel/CauroselComponent';
import HotelCard from '../../components/Card/HotelCard';
import SeeMoreComponent from '../../components/screen/SeeMoreComponent';
import CarouselSkeletonComponent from '../../components/Skeleton/CauroselSkeletonComponent';
import DummyData from '../../config/DummyData.json';
import {hotelList} from '../../services/HotelService';
import {bookmarkList} from '../../services/BookmarkService';

const Hotel = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [nearbyHotel, setNearbyHotel] = useState([]);
  const [bookmarkedHotels, setBookmarkedHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNearbyHotels = async () => {
    try {
      const response = await hotelList();
      console.log('fetchNearbyHotels:', JSON.stringify(response, null, 2));
      setNearbyHotel(response.data);
      if (response?.success === true && response.data?.length > 0) {
        setNearbyHotel(response.data);
      } else {
        console.log('No bookmarks found');
        setNearbyHotel([]);
      }
    } catch (error) {
      console.error('fetchNearbyHotels Error:', error);
      setNearbyHotel([]);
      throw error;
    }
  };

  const fetchBookmarkList = async () => {
    try {
      const response = await bookmarkList();
      // console.log('fetchBookmarkList:', JSON.stringify(response.data, null, 2));

      if (response?.success == true && response.data?.length > 0) {
        setBookmarkedHotels(response.data);
      } else {
        console.log('No bookmarks found');
        setBookmarkedHotels([]);
      }
    } catch (error) {
      console.error('fetchBookmarkList Error:', error);
      setBookmarkedHotels([]);
      throw error;
    }
  };

  useEffect(() => {
    console.log('Hotel useEffect trigger');

    if (showLoading) return;
    setShowLoading(true);
    try {
      fetchNearbyHotels();
      fetchBookmarkList();
    } catch (error) {
      console.error('Hotel useEffect Error:', error);
      throw error;
    } finally {
      setShowLoading(false);
    }

    return () => {
      // Cleanup function to prevent double execution
    };
  }, []);

  const data = DummyData.data;

  const hotels = DummyData.hotels;

  if (showLoading) {
    return <BookingSkeletonComponent type="Hotels Nearby" />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[CommonStyles.scrollViewContainer, {flexGrow: 1}]}>
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={[CommonStyles.subTitle, {marginTop: 0}]}>
                Top Hotels
              </Text>
              <CarouselComponent
                data={data}
                setShowLoading={setShowLoading}
                navigation={navigation}
                carouselType="home"
              />
              <SeeMoreComponent title="Hotels Nearby" onPress={() => {}} />
              <FlatList
                data={nearbyHotel}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                  const isBookmarked = bookmarkedHotels.some(
                    bookmark => bookmark.hotelId === item.id,
                  );

                  return (
                    <HotelCard
                      hotel={item}
                      hotelId={item.id}
                      bookmarked={isBookmarked}
                      refreshFun={fetchBookmarkList}
                      onPress={() =>
                        navigation.navigate('AppStack', {
                          screen: 'RoomCategoryScreen',
                          params: {hotel: item, id: item.id},
                        })
                      }
                      refreshing={refreshing}
                      onRefresh={() => {
                        setRefreshing(true);
                        fetchBookmarkList();
                        setRefreshing(false);
                        return;
                      }}
                    />
                  );
                }}
                numColumns={2}
                contentContainerStyle={{marginTop: 20}}
              />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
