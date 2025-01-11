import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'; // For icons
import theme from '../../style/colors';

export const RenderNotification = ({item, onPress}) => (
  <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
    <Image source={item.icon} style={styles.notificationIcon} />
    <View style={styles.textContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
    <Icon name="arrow-right" size={20} color="#ccc" />
  </TouchableOpacity>
);

const NotificationList = ({notifications}) => {
  return (
    <View>
      {/* Notification List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <RenderNotification
              item={item}
              onPress={() => console.log(item.id)}
            />
          )}
          contentContainerStyle={styles.notificationList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications available</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  notificationList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: theme.colors.bookingTabBarColor,
    backgroundColor: theme.colors.bookingTabBarColor,
    borderRadius: 20,
    marginVertical: 5,
  },
  notificationIcon: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: theme.colors.gridColor,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  notificationDescription: {
    fontSize: 12,
    color: theme.colors.textGray,
    marginTop: 3,
  },
});
