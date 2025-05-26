import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../components/ProgessBarComponent';

const screenWidth = Dimensions.get('window').width;

export default function OTPScreen() {
  const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState('');

  const isValid = otpCode.length === 6;

  return (
<View style={styles.container}>
  <HeaderComponent title="OTP Verification" navigation={navigation} />
  <ProgressBar currentStep={2} totalSteps={5} />
  <Text style={styles.label}>OTP Code</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter 6 digit otp code"
    keyboardType="number-pad"
    maxLength={6}
    value={otpCode}
    onChangeText={setOtpCode}
  />

  {/* Spacer to push content down */}
  <View style={{ flex: 1 }} />

  <View style={styles.bottomSection}>
    <View style={styles.resendContainer}>
      <Text style={styles.resendText}>No OTP yet?</Text>
      <TouchableOpacity>
        <Text style={styles.resendLink}> Resend OTP</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      disabled={!isValid}
      style={[styles.button, !isValid && styles.buttonDisabled]}
      onPress={() => {
       navigation.navigate('CreatePin');
      }}
    >
      <Text style={styles.buttonText}>Verify OTP</Text>
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
  progressBar: {
    flexDirection: 'row',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  
  progressSegment: {
    flex: 1,
  },
  
  progressStepFilled: {
    backgroundColor: '#007bff',
  },
  
  progressStepEmpty: {
    backgroundColor: '#e0e0e0',
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: '#555',
  },
  resendLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 30,
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
  bottomSection: {
    marginBottom: 20,
  },
  
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  
});
