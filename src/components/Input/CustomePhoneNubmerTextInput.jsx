import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const countryCodes = [
  {label: '+95', value: '+95'}, 
  {label: '+1', value: '+1'}, // USA
  {label: '+44', value: '+44'}, // UK
  {label: '+91', value: '+91'}, // India
  {label: '+81', value: '+81'}, // Japan
];

const CustomPhoneNumberTextInput = ({phoneNumber,setPhoneNumber,contentContainerStyle}) => {
  const [selectedCode, setSelectedCode] = useState('+95');

  return (
    <View style={contentContainerStyle}>
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.container}>
        {/* Country Code Dropdown */}
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={value => setSelectedCode(value)}
            items={countryCodes}
            value={selectedCode}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
          />
        </View>

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownContainer: {
    width: 80,
    justifyContent: 'center',
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#000',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    color: 'black',
  },
};

export default CustomPhoneNumberTextInput;
