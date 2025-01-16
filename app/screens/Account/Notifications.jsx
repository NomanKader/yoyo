import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons
import cancelIcon from '../../assets/icons/cancelIcon.png';
import paymentNotiIcon from '../../assets/icons/paymentNotiIcon.png';
import bookingCancelNotiIcon from '../../assets/icons/bookingCancelNotiIcon.png';
import bookingSuccessNotiIcon from '../../assets/icons/bookingSuccessNotiIcon.png';
import theme from '../../style/colors';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import NotificationList from '../../components/List/NotificationList';

const {width, height} = Dimensions.get('window');

const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Booking was canceled by owner',
      description: 'You have canceled a booking, refer...',
      icon: bookingCancelNotiIcon, // Replace with actual icon paths
    },
    {
      id: '2',
      title: 'Payment Successful',
      description: 'Your payment is successful, kindly...',
      icon: paymentNotiIcon, // Replace with actual icon paths
    },
    {
      id: '3',
      title: 'Booking Successful',
      description: 'You have booked a room in Jora...',
      icon: bookingSuccessNotiIcon, // Replace with actual icon paths
    },
  ]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      <DetailAppBarComponent
        title="Notification"
        navigation={navigation}
        // search={false}
      />
      <View style={styles.clearAllContainer}>
        <TouchableOpacity
          style={styles.clearAllButton}
          onPress={handleClearAll}>
          <Text style={styles.clearAllText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>

      <NotificationList notifications={notifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gridColor,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  clearAll: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  clearAllContainer: {
    alignItems: 'flex-end',
  },
  clearAllButton: {
    width: width * 0.27,
  },
  clearAllText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textGray,
    width: 70,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLightGray,
  },
});

export default Notifications;
