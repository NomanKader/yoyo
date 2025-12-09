import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';
import { BASE_IMAGE_URL } from '../../../common/service/HttpService';

const RoomListComponent = ({ data, navigation, type, onPress }) => {
  console.log("Typ", type);
  const { translate } = useContext(LanguageContext);

  // Function to get status-specific styles
  const getStatusStyle = (purchased) => {
    if (purchased === true) {
      return {
        text: "Purchased",
        color: "#19B791",
        backgroundColor: "#E9FBF3"
      };
    }

    if (purchased === false) {
      return {
        text: "Not Purchased",
        color: "#FF3B30",
        backgroundColor: "#FFECEC"
      };
    }

    // fallback
    return {
      text: "",
      color: "grey",
      backgroundColor: "#E0E0E0"
    };
  };


  const renderItem = ({ item }) => {
    const isCategory = type === 'category';
    const statusStyle = getStatusStyle(item.purchased);
    const formatDateForDisplay = (date) =>
      `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    const roomStatus = isCategory
      ? `${item.numberOfRooms} ${translate?.room.Rooms}`
      : translate?.room[item.roomStatus] || item.roomStatus;

    return (
      <Pressable onPress={() => onPress(item)}>
        <View style={styles.card}>
          <View style={styles.thumbnail}>
            <Image
              source={{ uri: `${BASE_IMAGE_URL}${item.roomPhotos[0].photoName}` }}
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
                  <Text style={styles.subtitle}>{item.guestName}</Text>
                </>
              )}
            </View>
            <View style={styles.statusContainer}>
              <Text style={{ color: theme.colors.dateColor }}>
                {formatDateForDisplay(new Date(item.checkInDate))}
              </Text>
              <Text style={{ color: statusStyle.color }}>
                Paid
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
    // flex: 1,
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
    width: 180,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    width: 200
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
});

export default RoomListComponent;
