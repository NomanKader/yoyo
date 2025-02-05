import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or any icon library you use
import theme from '../../style/colors';
import {addBookmark, removeBookmark} from '../../services/BookmarkService';

const HotelCard = ({hotel, hotelId, bookmarked, onPress, refreshFun}) => {
  const addBookmarkFun = async () => {
    try {
      const response = await addBookmark(hotelId);
      console.log('addBookmarkFun:', JSON.stringify(response.data, null, 2));
      refreshFun();
    } catch (error) {
      console.error('addBookmarkFun Error:', error);
      throw error;
    }
  };

  const removeBookmarkFun = async () => {
    console.log('hotel', hotel);
    try {
      const response = await removeBookmark(hotelId);
      console.log('removeBookmarkFun:', JSON.stringify(response.data, null, 2));
      refreshFun();
    } catch (error) {
      console.error('removeBookmarkFun Error:', error);
      throw error;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?semt=ais_hybrid',
        }}
        style={styles.image}
      />
      <TouchableOpacity
        style={[styles.bookmarkIcon, bookmarked && {borderColor: 'blue'}]}
        onPress={() => (bookmarked ? removeBookmarkFun() : addBookmarkFun())}>
        <Icon
          name={bookmarked ? 'bookmark' : 'bookmark-o'}
          size={15}
          color={bookmarked ? 'blue' : 'gray'}
        />
      </TouchableOpacity>

      <View style={styles.bookmarkContainer}>
        <Text style={styles.hotelName}>{hotel.hotelName}</Text>
      </View>
      <Text style={styles.location}>{hotel.address}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: theme.colors.textLight,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bookmarkContainer: {
    padding: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: theme.colors.infoText,
  },
  bookmarkIcon: {
    padding: 10,
    position: 'absolute',
    width: 37,
    height: 37,
    top: 10,
    right: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.textLight,
    borderRadius: 37 / 2,
    borderColor: theme.colors.textGray,
    borderWidth: 1,
  },
});

export default HotelCard;
