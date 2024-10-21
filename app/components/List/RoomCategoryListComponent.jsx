import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';

const RommCategoryListComponent = ({ data, navigation, type, onPress }) => {
  const { translate } = useContext(LanguageContext);

  // Function to get status-specific styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Unpaid':
        return { color: theme.colors.error, backgroundColor: 'transparent' };
      case 'Paid':
        return { color: theme.colors.info, backgroundColor: 'transparent' };
      default:
        return {
          color: status==='Occupied'?'#19B791':status==='Vacant'?'#FF8B33':theme.colors.textDark,
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
              <View style={[styles.status, { backgroundColor: statusStyle.backgroundColor }]}>
                <Text style={{ color: statusStyle.color }}>
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
    width: 180,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    width:200
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow:1
  },
  status: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default RommCategoryListComponent;
