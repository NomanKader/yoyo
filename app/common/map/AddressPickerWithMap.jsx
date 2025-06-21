import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import CustomInput from '../../apartment/components/Input/CustomInput';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import MarkIcon from '../assets/mapIcon.png';

const GOOGLE_API_KEY = 'AIzaSyBCQktakyeMA8A1kI80UjSxIpngXUOeXk8';

const AddressPickerWithMap = ({
  title = 'Enter address',
  initialQuery = '',
  mapRef,
  marker,
  customMapStyle,
  onChangeLocation,
}) => {
  const defaultRegion = {
    latitude: 16.8409,
    longitude: 96.1735,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [initialRegion] = useState(
    marker?.latitude && marker?.longitude
      ? {
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }
      : defaultRegion,
  );

  const [region, setRegion] = useState(initialRegion);
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const timeoutRef = useRef(null);
  const lastFetchedRef = useRef({lat: null, lng: null});

  useEffect(() => {
    if (marker?.latitude && marker?.longitude && query === '') {
      fetchAddressDetails(marker.latitude, marker.longitude);
      lastFetchedRef.current = {lat: marker.latitude, lng: marker.longitude};
    } else {
      fetchAddressDetails(region.latitude, region.longitude);
      lastFetchedRef.current = {lat: region.latitude, lng: region.longitude};
    }
  }, []);

  const handleSearch = async text => {
    setQuery(text);
    if (text.length <= 2) return setSuggestions([]);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:MM`;
      const res = await axios.get(url);
      setSuggestions(res.data.predictions || []);
    } catch (error) {
      console.error('Autocomplete fetch failed:', error);
    }
  };

  const handleSuggestionPress = async placeId => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
      const res = await axios.get(url);
      const loc = res.data.result.geometry.location;
      const lat = loc.lat;
      const lng = loc.lng;
      const formattedAddress = res.data.result.formatted_address || '';

      setSuggestions([]);
      setQuery(formattedAddress);

      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion);
      lastFetchedRef.current = {lat, lng};
      fetchAddressDetails(lat, lng);

      Keyboard.dismiss();
    } catch (error) {
      console.error('Place details fetch failed:', error);
    }
  };

  const handleRegionChangeComplete = useCallback(newRegion => {
  setRegion(newRegion);

  const offset = newRegion.latitudeDelta * 0.15;
  const adjustedLatitude = newRegion.latitude - offset;
  const adjustedLongitude = newRegion.longitude;

  // Immediately update the address
  fetchAddressDetails(adjustedLatitude, adjustedLongitude);
  lastFetchedRef.current = { lat: adjustedLatitude, lng: adjustedLongitude };

  // Optional: debounce further updates if needed
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    // could add background updates or smooth animation logic here
  }, 1000);
}, []);


  const fetchAddressDetails = async (lat, lng, addressFromSearch = '') => {
    console.log('latlong', lat, lng);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );

      if (res.data.status !== 'OK') return;

      const formatted =
        addressFromSearch || res.data.results[0]?.formatted_address || '';
      setQuery(formatted);

      let components = [];
      res.data.results.forEach(r => {
        components = [...components, ...r.address_components];
      });

      const getComponent = type =>
        components.find(c => c.types.includes(type))?.long_name || '--';

      const locationDetails = {
        state: getComponent('administrative_area_level_1'),
        city:
          getComponent('locality') ||
          getComponent('administrative_area_level_2'),
        township: getComponent('administrative_area_level_3'),
        latitude: lat,
        longitude: lng,
        address: formatted,
      };

      onChangeLocation?.(locationDetails);
    } catch (error) {
      console.error('Reverse geocode failed:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <View>
      <CustomInput
        label={title}
        value={query}
        onChangeText={handleSearch}
        contentContainerStyle={styles.input}
      />

      <ScrollView
        style={styles.suggestionsList}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled>
        {suggestions.map(item => (
          <TouchableOpacity
            key={item.place_id}
            onPress={() => handleSuggestionPress(item.place_id)}
            style={styles.suggestionItem}>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Map</Text>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={customMapStyle}
          initialRegion={initialRegion}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete}
        />

        {/* Floating marker centered visually */}
        <View pointerEvents="none" style={styles.centerMarker}>
          <Image
            source={MarkIcon}
            tintColor="#FFA500"
            style={styles.markerImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default AddressPickerWithMap;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  mapWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 250,
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25, // half of image width
    marginTop: -50, // full image height to point pin tip at center
    zIndex: 10,
  },

  markerImage: {
    width: 50,
    height: 50,
  },
});
