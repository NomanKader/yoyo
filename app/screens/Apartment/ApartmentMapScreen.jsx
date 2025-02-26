import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ApartmentMapScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Default coordinates (Yangon, Myanmar)
  const [region, setRegion] = useState({
    latitude: 16.7741,
    longitude: 96.1586
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch current location if no params are passed
  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      setRegion({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => console.log('Location Error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {/* Selected Location Marker */}
        <Marker coordinate={region} title="Selected Location" />
        
        {/* Circle Around Selected Area */}
        <Circle
          center={region}
          radius={500}
          strokeWidth={1}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(0, 0, 255, 0.2)"
        />
      </MapView>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={22} color="#FFF" />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Panbedan, Maharbandula" />
        <TouchableOpacity>
          <Icon name="search" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  searchBox: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  searchInput: { flex: 1, fontSize: 16 },
});

