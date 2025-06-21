import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
} from 'react-native';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '../components/ProgessBarComponent';
import {RegisterContext} from '../utils/RegisterProvider';
import {RequestOTP, VerifyOTp} from '../service/AuthService';
import CustomAlert from '../alert/CustomAlert';

const screenWidth = Dimensions.get('window').width;

export default function OTPScreen({route}) {
  const {resendTime} = route.params || {};
  const {registerData, updateRegisterData} = useContext(RegisterContext);
  const navigation = useNavigation();

  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  const isValid = otpCode.length === 6;

  useEffect(() => {
    const onBackPress = () => {
      if (loading) return true;
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, [loading]);

  useEffect(() => {
    if (!resendTime) return;

    const expireTime = new Date(resendTime);

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.floor((expireTime - now) / 1000);

      if (diff <= 0) {
        setResendTimer(0);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setResendTimer(diff);
      }
    };

    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTime]);

  const resendOTPCode = async () => {
    try {
      setResendLoading(true);
      const postBody = {
        phone: null,
        email: registerData.email || '',
        code: null,
      };

      const response = await RequestOTP(postBody);

      if (response?.success) {
        console.log('OTP resent successfully:', response);
        if (response?.codeExpireDate) {
          navigation.setParams({resendTime: response.data?.codeExpireTime});
        }
      } else {
        console.warn(
          'Failed to resend OTP:',
          response?.message || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    } finally {
      setResendLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    const postBody = {
      phone: null,
      email: registerData.email || '',
      code: otpCode,
    };

    try {
      const response = await VerifyOTp(postBody);
      if (response.success) {
        registerData.otpToken = response.token;
        navigation.navigate('CreatePin');
      } else {
        setAlertVisible(true);
        setErrorMessage(response.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.log('error', error);
      if (!error.success) {
        setAlertVisible(true)
        setErrorMessage(`${error.message}, please try again.`);
      } 
      
    } finally {
      setLoading(false);
    }
  };

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={'Something went wrong'}
        message={errorMessage}
      />
      <HeaderComponent
        title="OTP Verification"
        onPress={loading ? null : () => navigation.goBack()}
      />
      <ProgressBar
        contentContainerStyle={{marginTop: -10}}
        currentStep={2}
        totalSteps={5}
      />
      <Text style={styles.infoText}>
        OTP Code was sent to your email address. Please check and enter below!
      </Text>

      <Text style={styles.label}>OTP Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 6 digit otp code"
        keyboardType="number-pad"
        maxLength={6}
        value={otpCode}
        onChangeText={setOtpCode}
        editable={!loading}
      />

      {/* Countdown display */}
      {resendTimer > 0 ? (
        <Text style={[styles.resendText, {marginTop: 6}]}>
          Code will expire in{' '}
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            {formatTime(resendTimer)}
          </Text>
          <Text style={{color: 'gray'}}> mins</Text>
        </Text>
      ) : (
        <Text style={styles.errorText}>
          The code has expired. Please resend!
        </Text>
      )}

      <View style={{flex: 1}} />

      <View style={styles.bottomSection}>
        {/* Only show resend option if timer reached 0 */}
        {resendTimer === 0 && (
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>No OTP yet?</Text>
            <TouchableOpacity onPress={resendOTPCode} disabled={resendLoading}>
              {resendLoading ? (
                <Text style={styles.resendLink}> Resending...</Text>
              ) : (
                <Text style={styles.resendLink}> Resend OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          disabled={!isValid || loading}
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          onPress={verifyOtp}>
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
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
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 17,
    color: '#333',
    marginBottom: 12,
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
  resendText: {
    fontSize: 14,
    color: '#555',
  },
  resendLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 6,
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
    alignItems: 'center',
    marginBottom: 12,
  },
});
