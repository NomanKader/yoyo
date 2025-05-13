import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

const MapPickerComponent = ({ onLocationSelected }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
      },
      (error) => {
        Alert.alert('Error', 'Could not fetch your location');
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, []);

  // Handle map press to select a location
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  // Function to confirm location selection
  const confirmLocation = () => {
    if (selectedLocation) {
      onLocationSelected(selectedLocation);
    } else {
      Alert.alert('No location selected', 'Please tap on the map to select a location.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
          />
        )}
      </MapView>

      {/* Button to confirm location selection */}
      <View style={styles.buttonContainer}>
        <Button title="Confirm Location" onPress={confirmLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
  },
});

export default MapPickerComponent;
