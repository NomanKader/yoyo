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
import {ResetPassword} from '../service/AuthService';
import paymentSuccessIcon from '../assets/paymentSuccessIcon.png';
import theme from '../../apartment/style/colors';
import CustomAlert from '../alert/CustomAlert';

const screenWidth = Dimensions.get('window').width;

export default function CreateNewPinScreen({navigation, route}) {
  const {email, token} = route.params || {};
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePin = async () => {
    // setLoading(true);
    // try {
    //   const postBody = {
    //     otpToken: token,
    //     email: email,
    //     phone: null,
    //     password: confirmPin,
    //   };

    //   const response = await ResetPassword(postBody);

    //   if (response?.result) {
    //     navigation.navigate('HotelTabStack', {
    //       screen: 'SuccessScreen',
    //       params: {
    //         header: 'New Pin code is changed Successfully',
    //         subheader: '',
    //         nextScreen: 'Login',
    //         icon: paymentSuccessIcon,
    //         isShowingIllustration: true,
    //         buttonText: 'Back to Login',
    //         color: theme.colors.primary,
    //       },
    //     });
    //   } else {
    //     console.warn('Reset failed:', response?.message || 'Unknown error');
    //     setErrorMessage(response?.message || 'Failed to reset pin');
    //     setAlertVisible(true);
    //   }
    // } catch (error) {
    //   console.error('Reset error:', error);
    // } finally {
    //   setLoading(false);
    // }
    navigation.navigate('HotelTabStack', {
      screen: 'SuccessScreen',
      params: {
        header: 'New Pin Updated Successfully',
        subheader: '',
        nextScreen: 'HotelTabStack',
        icon: paymentSuccessIcon,
        isShowingIllustration: true,
        buttonText: 'Back to Dashboard',
        color: theme.colors.primary,
      },
    });
    setPin('');
    setNewPin('');
    setConfirmPin('');
    setShowPin(false);
    setShowConfirmPin(false);
    setLoading(false);
    setAlertVisible(false);
    setErrorMessage('');
  };

  const isValid =
    (pin.length === 4 && newPin.length===4 && confirmPin.length === 4  && newPin === confirmPin);

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        message={errorMessage}
        title={"Something's Wrong!"}
      />
      <HeaderComponent
        title="Change Pin"
        onPress={() => navigation.goBack()}
      />
      {/* <ProgressBar currentStep={3} totalSteps={5} /> */}

      {/* Create Pin */}
      <Text style={styles.label}>Current Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your current 4 digit pin"
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

      {/* New Pin */}
      <Text style={styles.label}>New Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter a new 4 digit pin"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={!showConfirmPin}
          value={newPin}
          onChangeText={setNewPin}
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

      {/* Confrim Pin */}
      <Text style={styles.label}>Confirm New Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Re-Enter new pin"
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
          disabled={!isValid || loading}
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          onPress={handleChangePin}>
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Proceed'}
          </Text>
        </TouchableOpacity>
      </View>
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
