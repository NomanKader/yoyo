import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';

const RoomListComponent = ({ data, navigation, type, onPress }) => {
  const { translate } = useContext(LanguageContext);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Unpaid':
        return { color: theme.colors.error, backgroundColor: 'transparent' };
      case 'Paid':
        return { color: theme.colors.info, backgroundColor: 'transparent' };
      default:
        return {
          color: status === 'Occupied' ? '#19B791' : status === 'Vacant' ? '#FF8B33' : theme.colors.textDark,
          backgroundColor: status === 'Occupied'
            ? '#EAFAF6'
            : status === 'Vacant'
              ? '#FFF4EC'
              : theme.status.backgroundColor,
        };
    }
  };

  const renderItem = ({ item }) => {
    const isCategory = type === 'category';
    const statusStyle = getStatusStyle(item.roomStatus);
    const roomStatus = isCategory
      ? `${item.numberOfRooms} ${translate?.room.Rooms}`
      : translate?.room[item.roomStatus] || item.roomStatus;

    return (
      <Pressable onPress={() => onPress()}>
        <View style={styles.card}>
          <Image source={{ uri: item.roomPhoto }} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.roomInfo}>
              <Text style={styles.title}>
                {isCategory ? item.roomName : item.roomNumber}
              </Text>
              <Text style={styles.subtitle}>
                {isCategory ? `${item?.priceKyats?.toLocaleString()} Ks` : item?.roomCategory}
              </Text>
            </View>
            <View style={styles.statusWrapper}>
              <Text style={[styles.statusText, { color: statusStyle.color }]}>
                {roomStatus}
              </Text>
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
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  statusWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default RoomListComponent;
