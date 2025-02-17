import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import {LanguageContext} from '../../context/LanguageContext';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const RommCategoryListComponent = ({
  data,
  navigation,
  type,
  hotelId,
  onPress,
  leftBox = true,
}) => {
  const {translate} = useContext(LanguageContext);

  // Function to get status-specific styles
  const getStatusStyle = status => {
    switch (status) {
      case 'Unpaid':
        return {color: theme.colors.error, backgroundColor: 'transparent'};
      case 'Paid':
        return {color: theme.colors.info, backgroundColor: 'transparent'};
      default:
        return {
          color:
            status === 'Occupied'
              ? '#19B791'
              : status === 'Vacant'
              ? '#FF8B33'
              : theme.colors.textDark,
          backgroundColor:
            status === 'Occupied'
              ? '#EAFAF6'
              : status === 'Vacant'
              ? '#FFF4EC'
              : theme.status.backgroundColor,
        };
    }
  };

  const renderItem = ({item, index}) => {
    const isCategory = type === 'category';
    const statusStyle = getStatusStyle(item.roomStatus);

    const roomStatus = isCategory
      ? `${item.availableRoomCount} ${translate.room.Rooms}`
      : translate.room[item.roomStatus] || item.roomStatus || 'available';

    return (
      <Pressable
        onPress={
          type == 'category'
            ? async () => {
                let reserveInfo = await AsyncStorage.getItem('reserveInfo');
                let reserveInfoData = JSON.parse(reserveInfo);
                reserveInfoData = {
                  ...reserveInfoData,
                  ...{roomID: item.roomID},
                };
                await AsyncStorage.setItem(
                  'reserveInfo',
                  JSON.stringify(reserveInfoData),
                );
                console.log('reserveInfoData : ', reserveInfoData);
                navigation.navigate('AppStack', {
                  screen: 'RoomListScreen',
                  params: {room_type: item, hotelId},
                });
              }
            : () => onPress(item)
        }>
        <View style={styles.card}>
          <View style={styles.thumbnail}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?semt=ais_hybrid',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <View>
              {isCategory ? (
                <>
                  <Text style={styles.title}>{item.roomTypeName}</Text>
                  <Text
                    style={
                      styles.subtitle
                    }>{`${item.price.toLocaleString()} Kyats`}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>{item.roomNumber}</Text>
                  {/* <Text style={styles.subtitle}>{item.roomTypeName}</Text> */}
                </>
              )}
            </View>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.status,
                  leftBox
                    ? statusStyle.backgroundColor
                    : theme.colors.textLight,
                ]}>
                <Text style={{color: statusStyle.color}}>{roomStatus}</Text>
              </View>
            </View>
          </View>
        </View>
        <DividerComponent />
      </Pressable>
    );
  };

  return (
    <FlatList
      style={{minHeight: 500}}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.roomTypeID}
    />
    // <ScrollView nestedScrollEnabled={true} style={{minHeight: 500}}>
    //   {data.map((item, index) => {
    //     return renderItem({item, index});
    //   })}
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    // margin: 10,
    overflow: 'hidden',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  thumbnail: {
    width: 65,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 55, // Use the smaller dimension for width to match height
    height: 55, // Ensure width and height are equal
    // borderRadius: 27.5, // Half of the height (55 / 2)
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    width: width * 0.37,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    width: width * 0.4,
  },
  statusContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  status: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    // marginRight: 5
  },
});

export default RommCategoryListComponent;
