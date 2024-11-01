import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const Map = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      {/* Back button and search bar container */}
      <View style={styles.overlayContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <View style={styles.blueCircle}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Panbedan, Maharbandula"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
        </View>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        mapType='terrain'
        initialRegion={{
          latitude: 16.7794,
          longitude: 96.158,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 16.7794, longitude: 96.158 }}
          title="A Hotel"
          description="40000 MMK"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 10,
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconButton: {
    marginBottom: 8,
  },
  blueCircle: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#007AFF',  // Blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    width: '97%',
    // alignSelf:'center'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
  map: {
    flex: 1,
  },
});

export default Map;
