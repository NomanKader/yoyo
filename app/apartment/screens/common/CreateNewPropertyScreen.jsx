import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import OptionSelector from '../../components/Option/OptionSelector';
import CustomDropdown from '../../components/Dropdown/CustomDropDown';
import CustomInput from '../../components/Input/CustomInput';
import TextInputWithDropdown from '../../components/Dropdown/TextInputWithDropdown';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import IconInput from '../../components/Input/IconInput';
import PhotoUploadGallery from '../../components/photo/PhotoUploadGallery';
import HeaderComponent from '../../components/Divider/HeaderComponent';
const propertyTypeOptions = [
  {label: 'Condo', value: 'Condo'},
  {label: 'House', value: 'House'},
  {label: 'Apartment', value: 'Apartment'},
];

const countOptions = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
];

const CreateNewPropertyScreen = ({navigation}) => {
  const [selectedType, setSelectedType] = useState('Hotel');
  const [selectedListingType, setSelectedListingType] = useState('Rent');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Condo');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [location, setLocation] = useState('');
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

  const unitOptions = [
    {label: 'Sqm', value: 'Sqm'},
    {label: 'Sqft', value: 'Sqft'},
  ];
  const currencyUnitOptions = [
    {label: 'USD', value: 'USD'},
    {label: 'MMK', value: 'MMK'},
    {label: 'EUR', value: 'EUR'},
    {label: 'SGD', value: 'SGD'},
    {label: 'THB', value: 'THB'},
  ];
  const applianceOptions = [
    'TV',
    'Refrigerator',
    'Dryer',
    'Cloth Rack',
    'Washing Machine',
    'Heater',
    'Safe',
    'Electric Fan',
    'Oven',
    'Microwave',
    'Stove',
    'Post and Pans',
    'Rice Cooker',
    'Plates and Bowls',
    'Toaster',
    'Cutlery and Utensils',
    'Electric Kettle',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <HeaderComponent title={'Create Property'} navigation={navigation}/>
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
        data={propertyTypeOptions}
        value={selectedPropertyType}
        setValue={setSelectedPropertyType}
        placeholder="Select type"
      />
      <CustomInput
        label={'Property Title'}
        placeholder={'Property Title'}
        value={propertyTitle}
        onChangeText={setPropertyTitle}
      />
      <CustomInput
        label={'Property Description'}
        placeholder={'Property Description'}
        value={propertyDescription}
        onChangeText={setPropertyDescription}
        multiline
      />
      {/* Map View */}
      <CustomInput
        label={'Location'}
        placeholder={'Enter location'}
        value={location}
        onChangeText={setLocation}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 16.8409,
          longitude: 96.1735,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={{latitude: 16.8409, longitude: 96.1735}} />
      </MapView>

      <TextInputWithDropdown
        label="Property Size"
        value={sizeValue}
        onChangeText={setSizeValue}
        dropdownValue={sizeUnit}
        setDropdownValue={setSizeUnit}
        dropdownData={unitOptions}
      />
      <TextInputWithDropdown
        label="Rent Price"
        value={rentPrice}
        onChangeText={setRentPrice}
        dropdownValue={unitPrice}
        setDropdownValue={setUnitPrice}
        dropdownData={currencyUnitOptions}
      />

      <CustomDropdown
        label="Bedrooms"
        data={countOptions}
        value={bedRooms}
        setValue={setBedRooms}
        placeholder="Select"
      />
      <CustomDropdown
        label="Bathrooms"
        data={countOptions}
        value={bathRooms}
        setValue={setBathRooms}
        placeholder="Select"
      />
      <OptionSelector
        label="Amenties"
        options={applianceOptions}
        selected={selectedAmenities}
        setSelected={setselectedAmenities}
        multiSelect
      />
      <PhotoUploadGallery photos={photos} setPhotos={setPhotos} />
      <CustomInput
        label={'Contact Information'}
        placeholder={'Enter information'}
        value={location}
        onChangeText={setLocation}
      />
      <IconInput
        label="Phone"
        placeholder="phone"
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

      {/* Buttons */}
      <DefaultButtonComponent title={'Posting Listing'} />
      <DefaultButtonComponent
        title="Preview"
        backgroundColor="#FFFFFF33"
        textColor="#007AFF"
        borderColor="#007AFF"
        borderWidth={1}
        buttonStyle={{marginVertical: 10}}
      />
    </ScrollView>
  );
};

export default CreateNewPropertyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButton: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginVertical: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  photoRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#ddd',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonSecondary: {
    borderColor: '#007AFF',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
