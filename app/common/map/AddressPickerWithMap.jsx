import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import CustomInput from '../../apartment/components/Input/CustomInput';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyBCQktakyeMA8A1kI80UjSxIpngXUOeXk8';

const AddressPickerWithMap = ({
  title,
  mapRef,
  marker,
  setMarker,
  customMapStyle,
  getAddressDetails,
  getLatLong,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async text => {
    setQuery(text);
    if (text.length > 2) {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:MM`;
      const res = await axios.get(url);
      setSuggestions(res.data.predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = async placeId => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
    const res = await axios.get(url);
    const loc = res.data.result.geometry.location;

    const lat = loc.lat;
    const lng = loc.lng;
    setMarker({latitude: lat, longitude: lng});
    setSuggestions([]);
    setQuery(res.data.result.formatted_address);

    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });

    if (getAddressDetails) {
      await fetchAddressDetails(lat, lng);
    }

    if (getLatLong) {
      getLatLong(lat, lng);
    }

    Keyboard.dismiss();
  };

  const fetchAddressDetails = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
      );

      if (res.data.status === 'OK') {
        const formatted = res.data.results[0]?.formatted_address || '';
        setQuery(formatted);

        let components = [];
        for (let r of res.data.results) {
          components = [...components, ...r.address_components];
        }

        const getComp = type =>
          components.find(c => c.types.includes(type))?.long_name || '--';

        const locationDetails = {
          state: getComp('administrative_area_level_1'),
          city:
            getComp('locality') ||
            getComp('administrative_area_level_2') ||
            '--',
          township: getComp('administrative_area_level_3') || '--',
        };

        getAddressDetails?.(locationDetails);
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const handleMapPress = async e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({latitude, longitude});

    if (getAddressDetails) {
      await fetchAddressDetails(latitude, longitude);
    }

    if (getLatLong) {
      getLatLong(latitude, longitude);
    }
  };

  return (
    <>
      <CustomInput
        label={title}
        value={query}
        onChangeText={handleSearch}
        contentContainerStyle={styles.input}
      />

      <FlatList
        data={suggestions}
        keyExtractor={item => item.place_id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSuggestionPress(item.place_id)}
            style={styles.suggestionItem}>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsList}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      />

      <Text style={styles.label}>Map</Text>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: 16.8409,
            longitude: 96.1735,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}>
          {marker && <Marker coordinate={marker} pinColor="#FFA500" />}
        </MapView>
      </View>
    </>
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
});
