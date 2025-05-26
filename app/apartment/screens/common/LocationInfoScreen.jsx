import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import CustomHeader from '../../../common/components/CustomHeader';
import CustomInput from '../../components/Input/CustomInput';
import AddressPickerWithMap from '../../../common/map/AddressPickerWithMap';
import {
  customeMapStyle,
  customMapStyle,
} from '../../../common/style/CustomMapStyle';

const GOOGLE_API_KEY = 'AIzaSyBCQktakyeMA8A1kI80UjSxIpngXUOeXk8';
const {width} = Dimensions.get('window');

const LocationInfoScreen = ({navigation}) => {
  const mapRef = useRef();
  const [marker, setMarker] = useState(null);
  const [locationData, setLocationData] = useState({
    state: '--',
    city: '--',
    township: '--',
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Location Info'}
        onBack={() => navigation.goBack()}
        contentContainerStyle={{marginVertical: 10}}
      />
      <AddressPickerWithMap
        title={'Enter the address of hotel'}
        mapRef={mapRef}
        marker={marker}
        setMarker={setMarker}
        customMapStyle={customMapStyle}
        getAddressDetails={locationData => setLocationData(locationData)}
      />

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.fullWidthItem}>
            <Text style={styles.label}>State</Text>
            <Text style={styles.value}>{locationData.state}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfItem}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{locationData.city}</Text>
          </View>
          <View style={styles.halfItem}>
            <Text style={styles.label}>Township</Text>
            <Text style={styles.value}>{locationData.township}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LocationInfoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fullWidthItem: {
    flex: 1,
  },
  halfItem: {
    flex: 0.48,
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});
