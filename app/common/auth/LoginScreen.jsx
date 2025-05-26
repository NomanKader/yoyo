import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [countryCode, setCountryCode] = useState('+95');

  const isValid = phone.length >= 7 && pin.length === 4;

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backWrapper}>
          <Image
            source={require('../assets/backIcon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Login</Text>
        <View style={styles.placeholder} /> 
      </View>

      {/* Phone number */}
      <Text style={styles.label}>Phone number</Text>
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
  })}
>
  <View style={styles.dropdown}>
    <Text style={styles.dropdownText}>{countryCode}</Text>
    <Icon name="arrow-drop-down" size={18} color="#555" />
  </View>
</ModalDropdown>



        <TextInput
          placeholder="000 0000 000"
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Pin */}
      <Text style={styles.label}>Pin</Text>
      <View style={styles.inputWrapper}>
  <TextInput
    placeholder="Enter your 4 digit pin"
    style={styles.inputWithIcon}
    keyboardType="number-pad"
    maxLength={4}
    secureTextEntry={!showPin}
    value={pin}
    onChangeText={setPin}
  />
  <TouchableOpacity
    style={styles.iconInsideInput}
    onPress={() => setShowPin(!showPin)}
  >
    <Icon name={showPin ? 'visibility-off' : 'visibility'} size={22} color="#888" />
  </TouchableOpacity>
</View>

      {/* Forgot Pin */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPin')}>
        <Text style={styles.forgotText}>Forgot Pin</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, !isValid && styles.loginButtonDisabled]}
        disabled={!isValid}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <Text style={styles.signupText}>
        Don’t have an account ?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('TypeOfProperty')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  backWrapper: {
    width: 40,
    alignItems: 'flex-start',
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40, // same width as backWrapper
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginVertical: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  
  inputWithIcon: {
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingRight: 40, // leave space for icon
    fontSize: 16,
    height: 48,
  },
  
  iconInsideInput: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  
  dropdownRow: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  
  dropdownItem: {
    fontSize: 18,
    color: '#000',
  },
  
  dropdownWrapper: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f3f3f3',
    marginRight: 10,
    justifyContent: 'center',
    height: 48,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: 80,
    height: '100%',
  },

  dropdownText: {
    fontSize: 16,
    color: '#000',
  },

  dropdownMenu: {
    width: 80,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 4,
    elevation: 6, // Android shadow
    zIndex: 9999, // iOS layer priority
    overflow: 'visible',
  },
  

  input: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    height: 48,
  },

  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  forgotText: {
    color: '#007AFF',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#444',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
