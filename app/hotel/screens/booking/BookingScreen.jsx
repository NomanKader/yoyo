import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';

import ListSkeletonComponent from '../../components/Skeleton/ListSkeletonComponent';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';

import AppBarComponent from '../../components/AppBar/AppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import BookingListComponent from '../../components/List/BookingListComponent';
import SelectTabComponent from '../../components/Tab/SelectTabComponent';

import { LanguageContext } from '../../context/LanguageContext';
import { GetBookingList } from '../../services/BookingService';

export default function BookingScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [type, setType] = useState('ongoing'); // 'new' | 'ongoing' | 'checkin' | 'completed'
  const [refreshing, setRefreshing] = useState(false);

  const { language, translate } = useContext(LanguageContext);

  useEffect(() => {
    console.log('Language:', language);
    console.log('Translate:', translate);
    // initial load → use current tab's status
    loadBookings(true, getStatusFromType(type));
  }, []);

  const getStatusFromType = (tabKey) => {
    // 🔢 Map tab -> backend status code
    switch (tabKey) {
      case 'ongoing':
        return 0;
      case 'checkin':
        return 2;
      case 'completed':
        return 1; 
      default:
        return null; // all
    }
  };

  const loadBookings = async (showSkeleton = true, status = null) => {
    try {
      if (showSkeleton) setLoading(true);
      // 👉 expects backend: GetBookingList(status)
      const response = await GetBookingList(status);
      setBookingData(response || []);
    } catch (error) {
      console.error('Error fetching booking list:', error);
      Alert.alert('Error', 'Failed to load booking data');
    } finally {
      if (showSkeleton) setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings(false, getStatusFromType(type)); // refresh current tab
  };

  const handleTabChange = (tabKey) => {
    setType(tabKey);
    const status = getStatusFromType(tabKey);
    // call API whenever tab changes
    loadBookings(true, status);
  };

  const emptyMessageByType = () => {
    switch (type) {
      case 'new':
        return "You don't have any new bookings.";
      case 'ongoing':
        return "You don't have any ongoing bookings.";
      case 'checkin':
        return "You don't have any check-in bookings.";
      case 'completed':
        return "You don't have any completed bookings.";
      default:
        return "You don't have any booking lists.";
    }
  };

  return (
    <View style={styles.container}>
      <AppBarComponent
        title="Bookings"
        navigation={navigation}
        searchData={bookingData}
        type={type}
      />

      <DividerComponent />

      {loading ? (
        <View style={CommonStyles.scrollViewContainer}>
          <ListSkeletonComponent />
          <ListSkeletonComponent />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Tabs: New / Ongoing / Check-in / Completed */}
          <View style={{ padding: 20 }}>
            <SelectTabComponent
              selectedKey={type}
              onSelect={handleTabChange}
            />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={
              bookingData.length === 0
                ? styles.emptyContentContainer
                : styles.listContentContainer
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
              />
            }
          >
            {bookingData.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyText}>{emptyMessageByType()}</Text>
              </View>
            ) : (
              <BookingListComponent
                data={bookingData}
                navigation={navigation}
                type="list"
                onPress={(item) =>
                  navigation.navigate('AppStack', {
                    screen: 'BookingDetailScreen',
                    params: { id: item.id },
                  })
                }
              />
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },

  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  emptyContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
