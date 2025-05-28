import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderComponent from '../../components/Divider/HeaderComponent';

const dashboardStats = [
  {label: 'Total Bookings', value: 128, icon: 'calendar'},
  {label: 'Total Revenue', value: '32,50,000 MMK', icon: 'dollar-sign'},
  {label: 'Available Rooms', value: 42, icon: 'home'},
];

const topListings = [
  {id: '1', name: 'Sunset Bay Hotel', bookings: 36},
  {id: '2', name: 'Green Paradise', bookings: 28},
  {id: '3', name: 'Golden Hill View', bookings: 19},
];

const recentBookings = [
  {id: 'a1', guest: 'Nay Chi Oo', room: 'Deluxe Room', date: '27 Apr 2025'},
  {id: 'a2', guest: 'Min Khant', room: 'Suite', date: '26 Apr 2025'},
  {id: 'a3', guest: 'Su Htet', room: 'Standard Room', date: '25 Apr 2025'},
];

export default function DashboardScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>      
        <HeaderComponent onPress={() => navigation.goBack()} title={'Transaction History'}/>
      {/* Stats */}
      <View style={styles.statsRow}>
        {dashboardStats.map(stat => (
          <View key={stat.label} style={styles.statCard}>
            <Icon name={stat.icon} size={24} color="#0047AB" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Top Listings */}
      <Text style={styles.sectionTitle}>Top Listings</Text>
      {topListings.map(listing => (
        <View key={listing.id} style={styles.listItem}>
          <Text style={styles.listName}>{listing.name}</Text>
          <Text style={styles.listDetail}>{listing.bookings} bookings</Text>
        </View>
      ))}

      {/* Recent Bookings */}
      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      {recentBookings.map(booking => (
        <View key={booking.id} style={styles.listItem}>
          <View>
            <Text style={styles.listName}>{booking.guest}</Text>
            <Text style={styles.listDetail}>{booking.room}</Text>
          </View>
          <Text style={styles.listDetail}>{booking.date}</Text>
        </View>
      ))}

      {/* Manage Button */}
      <TouchableOpacity style={styles.manageBtn} onPress={() => navigation.navigate('ManageBooking')}>
        <Text style={styles.manageText}>Manage Bookings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 20,
      backgroundColor: '#FFF',
    //   paddingBottom: 40,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#0047AB',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    statCard: {
      width: '30%',
      backgroundColor: '#F4F6FA',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
      color: '#333',
    },
    statLabel: {
      fontSize: 12,
      color: '#777',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 10,
      color: '#222',
    },
    listItem: {
      backgroundColor: '#F9F9F9',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listName: {
      fontSize: 14,
      fontWeight: '600',
    },
    listDetail: {
      fontSize: 12,
      color: '#555',
    },
    manageBtn: {
      marginTop: 20,
      backgroundColor: '#0047AB',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    manageText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  