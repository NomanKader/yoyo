import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';

const RoomListComponent = ({ data, navigation, type, onPress }) => {
  const { translate } = useContext(LanguageContext);

  const renderItem = ({ item }) => {
    const isCategory = type === 'category';
    const statusStyles = [
      styles.status,
      isCategory
        ? { ...styles.categoryStatus, backgroundColor: '#F7F7F7', color: theme.colors.textDark }
        : item.roomStatus === 'Occupied'
        ? styles.occupied
        : item.roomStatus === 'Vacant'
        ? styles.vacant
        : styles.defaultStatus,
    ];

    const roomStatus = isCategory
      ? `${item.numberOfRooms} ${translate.room.Rooms}`
      : translate.room[item.roomStatus] || item.roomStatus;

    return (
      <Pressable onPress={() => onPress()}>
        <View style={styles.card}>
          <View style={styles.thumbnail}>
            <Image
              source={{ uri: item.roomPhoto }}
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <View>
              {isCategory ? (
                <>
                  <Text style={styles.title}>{item.roomName}</Text>
                  <Text style={styles.subtitle}>{`${item.priceKyats.toLocaleString()} Kyats`}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>{item.roomNumber}</Text>
                  <Text style={styles.subtitle}>{item.roomCategory}</Text>
                </>
              )}
            </View>
            <View style={styles.statusContainer}>
              <View style={statusStyles}>
                <Text style={isCategory ? styles.categoryText : item.roomStatus === 'Occupied' ? styles.occupiedText : styles.vacantText}>
                  {roomStatus}
                </Text>
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
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
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
    margin: 10,
    overflow: 'hidden',
    paddingTop:20,
    paddingRight:20,
    paddingBottom:20
  },
  thumbnail: {
    width: 65,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 55,  // Use the smaller dimension for width to match height
    height: 55, // Ensure width and height are equal
    borderRadius: 27.5, // Half of the height (55 / 2)
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    width:180,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:5
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  occupied: {
    backgroundColor: '#EAFAF6',
    color: '#19B791',
  },
  vacant: {
    backgroundColor: '#FFF4EC',
    color: '#FF8B33',
  },
  defaultStatus: {
    backgroundColor: 'grey',
    color: 'white',
  },
  categoryStatus: {
    backgroundColor: '#F7F7F7',
  },
  categoryText: {
    color: theme.colors.textDark,
  },
  occupiedText: {
    color: '#19B791',
  },
  vacantText: {
    color: '#FF8B33',
  },
});


export default RoomListComponent;
