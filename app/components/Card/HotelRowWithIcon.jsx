import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DummyData from '../../config/DummyData.json';
import {CommonStyles} from '../../style/CommonStyles';
import theme from '../../style/colors';

const hotelData = DummyData.hotels;

const {width, height} = Dimensions.get('window');

const HotelRowWithIcon = ({hotels, navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('AppStack', {
          screen: 'RoomCategoryScreen',
          params: {hotel: item, id: item.id},
        })
      }>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?semt=ais_hybrid',
        }}
        style={styles.hotelImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <Text style={styles.hotelLocation}>{item.address}</Text>
      </View>
      <Icon name="arrow-up-right" size={30} color="black" style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        CommonStyles.scrollViewContainer,
        {flex: 0, paddingBottom: height * 0.21},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hotelImage: {
    width: width * 0.18,
    height: height * 0.09,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textDark,
  },
  hotelLocation: {
    fontSize: 14,
    color: theme.colors.infoText,
  },
  icon: {
    marginLeft: 10,
  },
});

export default HotelRowWithIcon;
