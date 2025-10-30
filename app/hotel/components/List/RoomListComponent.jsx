import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import DividerComponent from '../Divider/DividerComponent';
import theme from '../../style/colors';
import { LanguageContext } from '../../context/LanguageContext';
import { BASE_IMAGE_URL } from '../../../common/service/HttpService';


const RoomListComponent = ({ data = [], navigation, type, onPress }) => {
  const { translate } = useContext(LanguageContext);

  const getStatusInfo = (status) => {
    switch (status) {
      case 0:
        return { text: 'Vacant', color: '#FF8B33', background: '#FFF4EC' };
      case 1:
        return { text: 'Occupied', color: '#19B791', background: '#EAFAF6' };
      default:
        return { text: 'Unknown', color: theme.colors.textDark, background: '#F0F0F0' };
    }
  };

  const renderItem = ({ item }) => {
    const statusInfo = getStatusInfo(item.status);
    const imageUri = item?.roomPhotos?.[0]?.photoName
      ? `${BASE_IMAGE_URL}${item.roomPhotos[0].photoName}`
      : 'https://via.placeholder.com/55';

    return (
      <Pressable onPress={() => navigation.navigate('RoomDetailScreen', { room: item })}>
        <View style={styles.card}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.roomInfo}>
              <Text style={styles.title}>Room {item.roomNumber}</Text>
              <Text style={styles.subtitle}>{item.roomCategoryName}</Text>
            </View>
            <View style={[styles.statusWrapper, { backgroundColor: statusInfo.background }]}>
              <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
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
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight || '#F9FAFB',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 12,
    marginRight: 14,
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textDark || '#1E1E1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  statusWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default RoomListComponent;
