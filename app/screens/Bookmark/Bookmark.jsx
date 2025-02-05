import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import theme from '../../style/colors';
import DividerComponent from '../../components/Divider/DividerComponent';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import DummyData from '../../config/DummyData.json';
import HotelCard from '../../components/Card/HotelCard';
import {CommonStyles} from '../../style/CommonStyles';
import {bookmarkList, removeBookmark} from '../../services/BookmarkService';

const Bookmark = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookmarkList = async (type = 'loading') => {
    if (showLoading || refreshing) return;
    try {
      if (type === 'loading') {
        setShowLoading(true);
        console.log('fetchBookmarkList:', 'loading');
      } else if (type === 'refresh') {
        setRefreshing(true);
        console.log('fetchBookmarkList:', 'refresh');
      }
      const response = await bookmarkList();
      console.log('fetchBookmarkList:', JSON.stringify(response.data, null, 2));
      setHotels(response.data);
    } catch (error) {
      console.error('fetchBookmarkList Error:', error);
      throw error;
    } finally {
      if (type === 'loading') {
        setShowLoading(false);
      } else if (type === 'refresh') {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    console.log('Bookmark useEffect trigger');

    fetchBookmarkList('loading');

    return () => {
      // Cleanup function to prevent double execution
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Bookmark</Text>
      <DividerComponent />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBookmarkList('refresh')}
          />
        }
        data={hotels}
        keyExtractor={item => item.bookmarkId.toString()}
        renderItem={({item}) => (
          <HotelCard
            bookmarked={true}
            hotel={item}
            hotelId={item.hotelId}
            refreshFun={fetchBookmarkList}
            onPress={() =>
              navigation.navigate('AppStack', {
                screen: 'RoomCategoryScreen',
                params: {hotel: item, id: item.hotelId},
              })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={[
          CommonStyles.scrollViewContainer,
          {marginTop: 20, paddingBottom: 100},
        ]}
      />
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  topTitle: {
    marginLeft: 20,
    fontSize: 20,
    color: theme.colors.textDark,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
