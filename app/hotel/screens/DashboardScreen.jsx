import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import DocumentUploadModal from '../components/Modal/DocumentUploadModal';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusCardComponent from '../components/Card/StatusCardComponent';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const chartWidth = Dimensions.get('window').width - 40;

export default function DashboardScreen({navigation}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleIDSubmit = () => {
    navigation.navigate('AppStack', {screen: 'AccountInfo'});
  };

  const handleDocSubmit = () => {
    navigation.navigate('AppStack', {screen: 'BasicHotelDetail'});
  };

  const bookings = [
    {
      id: '1',
      room: 'Room 406',
      code: 'CAL8729203939',
      date: '13-01-2024',
      image: require('../assets/images/room1.png'),
    },
    {
      id: '2',
      room: 'Room 402',
      code: 'CAL8729203939',
      date: '14-01-2024',
      image: require('../assets/images/room2.png'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <Icon
            name="search"
            size={20}
            color="#000"
            style={styles.iconSpacing}
          />
          <Icon name="notifications-outline" size={20} color="#000" />
        </View>
      </View>

      <View style={styles.statusCardSection}>
        <StatusCardComponent
          color="#1abc9c"
          label="Available Rooms"
          value={15}
          icon="calendar-outline"
        />
        <StatusCardComponent
          color="#f39c12"
          label="Occupied Rooms"
          value={67}
          icon="checkbox-outline"
        />
        <StatusCardComponent
          color="#007aff"
          label="Current Bookings"
          value={10}
          icon="list-outline"
        />
      </View>

      <Text style={styles.sectionTitle}>Booking Overview</Text>
      <BarChart
        data={{
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [{data: [90, 65, 63, 10, 80, 85, 5]}],
        }}
        width={chartWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => '#999',
          propsForBackgroundLines: {
            stroke: '#eee',
          },
        }}
        style={{marginVertical: 10, borderRadius: 8}}
        showBarTops={false}
      />

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.bookingItem}>
            <Image source={item.image} style={styles.roomImage} />
            <View style={{flex: 1}}>
              <Text style={styles.roomTitle}>{item.room}</Text>
              <Text style={styles.roomCode}>{item.code}</Text>
            </View>
            <View>
              <Text style={styles.checkInLabel}>Check-in Date :</Text>
              <Text style={styles.checkInDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />

      <DocumentUploadModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmitID={handleIDSubmit}
        onSubmitDocs={handleDocSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconSpacing: {
    marginRight: 15,
  },
  statusCardSection: {
    gap: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  seeAll: {
    color: '#007aff',
    fontWeight: 'normal',
    fontSize: 14,
  },
  bookingItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  roomImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  roomTitle: {
    fontWeight: 'bold',
  },
  roomCode: {
    color: '#77787c',
    fontSize: 12,
  },
  checkInLabel: {
    fontSize: 12,
    color: '#86888b',
  },
  checkInDate: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  
});
