import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or any icon library you use
import theme from '../../style/colors';

const HotelCard = ({ hotel, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      <Icon name='bookmark-o' size={16} color='black' style={styles.bookmarkIcon} />
      <View style={styles.bookmarkContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        
      </View>
      <Text style={styles.location}>{hotel.location}</Text>
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
    position:'relative'
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
    position:'absolute',
    width:33,
    height:35,
    top: 10,
    right : 10,
    backgroundColor: theme.colors.textLight,
    borderRadius: 35 / 2,
    borderColor: theme.colors.textGray,
    borderWidth:1,
    
  },
});

export default HotelCard;
