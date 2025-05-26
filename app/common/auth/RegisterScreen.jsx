import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';

const screenWidth = Dimensions.get('window').width;

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [hotelName, setHotelName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+95');

  const isValid = hotelName && email && phone;

  return (
    <View style={styles.container}>
      {/* Header with back and progress bar */}
      <HeaderComponent title={'Basic Information'} navigation={navigation} />
      <ProgressBar currentStep={1} totalSteps={5} />

      {/* Input Fields */}
      <Text style={styles.label}>Name of Hotel</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hotel name"
        value={hotelName}
        onChangeText={setHotelName}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.phoneRow}>
        <ModalDropdown
          key={countryCode}
          options={['+95', '+66']}
          value={countryCode}
          onSelect={(index, value) => setCountryCode(value)}
          style={styles.dropdownWrapper}
          dropdownStyle={styles.dropdownMenu}
          renderRow={(option, index, isSelected) => (
            <View style={styles.dropdownRow}>
              <Text style={styles.dropdownItem}>{option}</Text>
            </View>
          )}
          adjustFrame={style => ({
            ...style,
            top: style.top - 22, // remove space
          })}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>{countryCode}</Text>
            <Icon name="arrow-drop-down" size={18} color="#555" />
          </View>
        </ModalDropdown>
        <TextInput
          placeholder="000 0000 000"
          style={styles.phoneInput}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          disabled={!isValid}
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={() => navigation.navigate('OTP')}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account? <Text style={styles.signIn}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 14,
    color: '#555',
  },
  signIn: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  phoneInput: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    height: 48,
  },

  dropdownWrapper: {
    height: 48,
    width: 80,
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  dropdownText: {
    fontSize: 16,
    color: '#000',
  },

  dropdownItem: {
    fontSize: 16,
    color: '#000',
    padding: 10,
  },

  dropdownRow: {
    backgroundColor: '#fff',
  },

  dropdownMenu: {
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    elevation: 4,
    zIndex: 1000,
  },
  bottomSection: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
