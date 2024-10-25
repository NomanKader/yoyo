import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import {CommonStyles} from '../../style/CommonStyles';
import DividerComponent from '../../components/Divider/DividerComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';

export default function OTPScreen({route, navigation}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);
  const {bankInfo, amount} = route.params;
  const handleChange = (text, index) => {
    if (isNaN(text)) return; // Ensure input is a number

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // If the user types a number, move to the next input
    if (text && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }

    // If the user deletes a number (text is empty), move to the previous input
    if (!text && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      Alert.alert('Error', 'Please enter a 4-digit OTP code.');
      return;
    }
    // Implement OTP validation logic here
    Alert.alert('OTP Submitted', `Your OTP code is: ${otpCode}`);
    navigation.navigate('AppStack', {
      screen: 'WithdrawSuccessScreen',
      params: {bankInfo: bankInfo, amount: amount},
    });
  };

  return (
    <View style={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title="Confirm OTP Code" navigation={navigation} />
      <DividerComponent />
      <Text style={[CommonStyles.subHeader, styles.instructionText]}>
        Please provide the OTP code sent to your phone number
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (otpInputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={event => handleKeyPress(event, index)}
          />
        ))}
      </View>
      <View style={CommonStyles.defaultButtonContainer}>
        <DefaultButtonComponent
          title={'Confirm'}
          backgroundColor={theme.colors.primary}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  instructionText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
