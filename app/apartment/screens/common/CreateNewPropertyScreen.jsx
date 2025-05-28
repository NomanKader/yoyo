import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import OptionSelector from '../../components/Option/OptionSelector';
import CustomDropdown from '../../components/Dropdown/CustomDropDown';
import CustomInput from '../../components/Input/CustomInput';
import TextInputWithDropdown from '../../components/Dropdown/TextInputWithDropdown';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import IconInput from '../../components/Input/IconInput';
import PhotoUploadGallery from '../../components/photo/PhotoUploadGallery';
import HeaderComponent from '../../components/Divider/HeaderComponent';
import AddressPickerWithMap from '../../../common/map/AddressPickerWithMap';
import {
  customeMapStyle,
  customMapStyle,
} from '../../../common/style/CustomMapStyle';

const CreateNewPropertyScreen = ({navigation}) => {
  const [selectedType, setSelectedType] = useState('Hotel');
  const [selectedListingType, setSelectedListingType] = useState('Rent');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Condo');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [information, setInformation] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [sizeUnit, setSizeUnit] = useState('Sqm');
  const [rentPrice, setRentPrice] = useState('');
  const [unitPrice, setUnitPrice] = useState('USD');
  const [bedRooms, setBedRooms] = useState('1');
  const [bathRooms, setBathRooms] = useState('1');
  const [selectedAmenities, setselectedAmenities] = useState([]);
  const [negotiable, setNegotiable] = useState('Yes');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const mapRef = useRef();
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({
    lat: '',
    lng: '',
  });
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <HeaderComponent title={'Create Property'} onPress={() => navigation.goBack()} />

        <OptionSelector
          options={['Hotel', 'Apartment']}
          label="Type"
          selected={selectedType}
          setSelected={setSelectedType}
        />
        <OptionSelector
          options={['Rent', 'Sell', 'Rent/Sale']}
          label="Listing Type"
          selected={selectedListingType}
          setSelected={setSelectedListingType}
        />
        <CustomDropdown
          label="Property Type"
          data={[
            {label: 'Condo', value: 'Condo'},
            {label: 'House', value: 'House'},
            {label: 'Apartment', value: 'Apartment'},
          ]}
          value={selectedPropertyType}
          setValue={setSelectedPropertyType}
          placeholder="Select type"
        />
        <CustomInput
          label="Property Title"
          placeholder="Property Title"
          value={propertyTitle}
          onChangeText={setPropertyTitle}
        />
        <CustomInput
          label="Property Description"
          placeholder="Property Description"
          value={propertyDescription}
          onChangeText={setPropertyDescription}
          multiline
        />

        <AddressPickerWithMap
          title={'Location'}
          mapRef={mapRef}
          marker={marker}
          setMarker={setMarker}
          customMapStyle={customMapStyle}
          onChangeLocation={location => {
            console.log('Selected Location:', location);
            setLocation({
              lat: location.lat,
              lng: location.lng,
            });
          }}
        />

        <TextInputWithDropdown
          label="Property Size"
          value={sizeValue}
          onChangeText={setSizeValue}
          dropdownValue={sizeUnit}
          setDropdownValue={setSizeUnit}
          dropdownData={[
            {label: 'Sqm', value: 'Sqm'},
            {label: 'Sqft', value: 'Sqft'},
          ]}
        />
        <TextInputWithDropdown
          label="Rent Price"
          value={rentPrice}
          onChangeText={setRentPrice}
          dropdownValue={unitPrice}
          setDropdownValue={setUnitPrice}
          dropdownData={[
            {label: 'USD', value: 'USD'},
            {label: 'MMK', value: 'MMK'},
            {label: 'EUR', value: 'EUR'},
            {label: 'SGD', value: 'SGD'},
            {label: 'THB', value: 'THB'},
          ]}
        />
        <CustomDropdown
          label="Bedrooms"
          data={[
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
          ]}
          value={bedRooms}
          setValue={setBedRooms}
          placeholder="Select"
        />
        <CustomDropdown
          label="Bathrooms"
          data={[
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
          ]}
          value={bathRooms}
          setValue={setBathRooms}
          placeholder="Select"
        />
        <OptionSelector
          label="Amenities"
          options={[
            'TV',
            'Refrigerator',
            'Dryer',
            'Washing Machine',
            'Oven',
            'Microwave',
            'Stove',
            'Heater',
          ]}
          selected={selectedAmenities}
          setSelected={setselectedAmenities}
          multiSelect
        />
        <PhotoUploadGallery photos={photos} setPhotos={setPhotos} />
        <CustomInput
          label="Contact Information"
          placeholder="Enter information"
          value={information}
          onChangeText={setInformation}
        />
        <IconInput
          label="Phone"
          placeholder="Phone"
          iconName="call-outline"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <CustomDropdown
          label="Negotiable"
          data={[
            {label: 'Yes', value: 'Yes'},
            {label: 'No', value: 'No'},
          ]}
          value={negotiable}
          setValue={setNegotiable}
        />
        <IconInput
          label="Email"
          placeholder="Email"
          iconName="mail-outline"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <DefaultButtonComponent title="Posting Listing" />
        <DefaultButtonComponent
          title="Preview"
          backgroundColor="#FFFFFF33"
          textColor="#007AFF"
          borderColor="#007AFF"
          borderWidth={1}
          buttonStyle={{marginVertical: 10}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateNewPropertyScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
});
