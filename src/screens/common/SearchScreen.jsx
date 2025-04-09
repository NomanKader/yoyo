import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({route}) => {
  const locations = route?.params?.locations || [];

  const hasLocations = locations.length > 0;
  const initialRegion = {
    latitude: hasLocations ? locations[0].latitude : 21.9754,
    longitude: hasLocations ? locations[0].longitude : 96.0889,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {hasLocations &&
          locations.map(location => (
            <Marker
              key={location.locationId.toString()}
              
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.locationName}
              description={`ID: ${location.locationId}`}
            />
          ))}
      </MapView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
});
