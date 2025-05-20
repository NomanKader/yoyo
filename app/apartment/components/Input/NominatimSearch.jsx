import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomInput from './CustomInput';

const DEFAULT_YANGON_LOCATION = {
  latitude: 16.8409,
  longitude: 96.1735,
};

const NominatimSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_YANGON_LOCATION);

  const mapRef = useRef(null);
  const debounceTimeout = useRef(null);

  const handleChangeText = text => {
    setQuery(text);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      searchLocation(text);
    }, 1000);
  };

  const searchLocation = async text => {
    if (text.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=MM&q=${encodeURIComponent(text)}`,
        {
          headers: {
            'User-Agent': 'ReactNativeApp/1.0 (your@email.com)',
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSelect = item => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    const location = { latitude: lat, longitude: lon };

    setQuery(item.display_name);
    setResults([]);
    setSelectedLocation(location);
    Keyboard.dismiss();

    mapRef.current?.animateToRegion(
      {
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <View>
      <CustomInput
        label="Location"
        value={query}
        onChangeText={handleChangeText}
        placeholder="Search location"
        contentContainerStyle={{ marginBottom: 0 }}
      />

      {results.length > 0 && (
        <ScrollView
          style={styles.dropdown}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        >
          {results.map(item => (
            <TouchableOpacity
              key={item.place_id}
              onPress={() => handleSelect(item)}
              style={styles.resultItem}
            >
              <Text>{item.display_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      </View>
    </View>
  );
};

export default NominatimSearch;

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 200,
    marginVertical: 8,
  },
  map: {
    flex: 1,
  },
});
