import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../styles/colors';

const EnquiryScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('1 month');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Form Submitted:', {
      name,
      phoneNumber,
      email,
      rentalPeriod,
      message,
    });
    navigation.replace('propertiesDetailsScreen', {submitted: true});
  };

  const isFormValid =
    name && phoneNumber && email && rentalPeriod && message && countryCode;

  const handleCountryCodeChange = text => {
    // Remove non-numeric characters
    const numericCode = text.replace(/[^0-9]/g, '');

    // If the input is empty, keep placeholder behavior
    setCountryCode(numericCode ? `+${numericCode}` : '');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enquiry Now</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Phone Number*</Text>
        <View style={styles.phoneContainer}>
          <TextInput
            style={styles.countryCodeInput}
            placeholder='+66'
            placeholderTextColor={theme.colors.textLightGray}
            keyboardType="phone-pad"
            value={countryCode}
            onChangeText={handleCountryCodeChange}
            maxLength={4}
          />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Select rental period</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={value => setRentalPeriod(value)}
            items={[
              {label: '1 month', value: '1 month'},
              {label: '3 months', value: '3 months'},
              {label: '6 months', value: '6 months'},
              {label: '12 months', value: '12 months'},
            ]}
            value={rentalPeriod}
            style={{
              ...pickerSelectStyles,
              iconContainer: {top: '35%', right: 5},
            }}
            placeholder={{label: 'Select rental period', value: null}}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
          />
        </View>

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Enter your message"
          multiline={true}
          value={message}
          onChangeText={setMessage}
        />

        {/* Submit Button */}
        <DefaultButtonComponent
          disabled={!isFormValid}
          title={'Submit'}
          onPress={handleSubmit}
          backgroundColor={'#1E40AF'}
        />
      </View>
    </View>
  );
};

export default EnquiryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  countryCodeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: 70, // Fixed width for country code
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCodeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    height: 50,
    marginBottom: 15,
  },
  messageBox: {
    height: 100,
    textAlignVertical: 'top',
  },
});

// Picker Select Styles
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 15, // Center text properly
    paddingHorizontal: 10,
    color: '#000',
    textAlignVertical: 'center', // Ensure text stays in center
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: '#000',
    textAlignVertical: 'center',
  },
};
