import React, {useState, useRef, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AddressPickerWithMap from '../map/AddressPickerWithMap';
import {customMapStyle} from '../style/CustomMapStyle';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {RegisterContext} from '../utils/RegisterProvider';

const LocationInfoScreen = ({navigation}) => {
  const mapRef = useRef();
  const {registerData, updateRegisterData} = useContext(RegisterContext);

  const [marker, setMarker] = useState(
    registerData?.lat && registerData?.lng
      ? {latitude: registerData.lat, longitude: registerData.lng}
      : null,
  );

  const handleChangeLocation = location => {
    updateRegisterData('lat', location.latitude);
    updateRegisterData('lng', location.longitude);
    updateRegisterData('state', location.state || '--');
    updateRegisterData('city', location.city || '--');
    updateRegisterData('township', location.township || '--');
    updateRegisterData('address', location.address || '--');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <HeaderComponent title="Location Info" onPress={() => navigation.goBack()} />
      <ProgressBar currentStep={4} totalSteps={5} />

      <AddressPickerWithMap
        title="Enter hotel address"
        mapRef={mapRef}
        marker={marker}
        setMarker={setMarker}
        customMapStyle={customMapStyle}
        onChangeLocation={handleChangeLocation}
        initialQuery= {registerData.address || ''}
      />

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.fullWidthItem}>
            <Text style={styles.label}>State</Text>
            <Text style={styles.value}>{registerData.state}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfItem}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{registerData.city}</Text>
          </View>
          <View style={styles.halfItem}>
            <Text style={styles.label}>Township</Text>
            <Text style={styles.value}>{registerData.township}</Text>
          </View>
        </View>
      </View>

      <DefaultButtonComponent
        title={'Proceed'}
        buttonStyle={{marginTop: 50}}
        disabled={
          registerData.lat === '' ||
          registerData.long === '' ||
          registerData.state === '--' ||
          registerData.city === '--' ||
          registerData.township === '--'
        }
        onPress={() => navigation.navigate('DocumentUpload')}
      />
    </ScrollView>
  );
};

export default LocationInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
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
});
