import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import {RegisterContext} from '../utils/RegisterProvider';

const screenWidth = Dimensions.get('window').width;

export default function CreatePinScreen({navigation}) {
  const {updateRegisterData} = useContext(RegisterContext);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const isValid =
    pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;

  return (
    <View style={styles.container}>
      <HeaderComponent title="Create Pin" onPress={() => navigation.goBack()} />
      <ProgressBar  contentContainerStyle={{marginTop: -25}} currentStep={3} totalSteps={5} />

      {/* Create Pin */}
      <Text style={styles.label}>Create Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter 4 digit pin"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={!showPin}
          value={pin}
          onChangeText={setPin}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPin(!showPin)}>
          <Icon
            name={showPin ? 'visibility-off' : 'visibility'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Pin */}
      <Text style={styles.label}>Confirm Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Re-Enter pin"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={!showConfirmPin}
          value={confirmPin}
          onChangeText={setConfirmPin}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPin(!showConfirmPin)}>
          <Icon
            name={showConfirmPin ? 'visibility-off' : 'visibility'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          disabled={!isValid}
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={() => {
            updateRegisterData('password', pin);
            navigation.navigate('LocationInfo');
          }}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    paddingTop: 3,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    height: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSection: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
