import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({route}) => {
  const locations = route?.params?.locations || [
    {
      id: 1,
      name: 'Sule',
      latitude: 21.9754,
      longitude: 96.0889,
    },
    {
      id: 2,
      name: 'Bahan',
      latitude: 21.976,
      longitude: 96.0891,
    },
  ];

  const initialRegion = {
    latitude: locations[0]?.latitude || 21.9754,
    longitude: locations[0]?.longitude || 96.0889,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={`ID: ${location.id}`}
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
