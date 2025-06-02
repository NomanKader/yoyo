import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import CustomInput from '../../apartment/components/Input/CustomInput';
import {RequestOTP, VerifyOTp} from '../service/AuthService';
import CustomAlert from '../alert/CustomAlert';

const ResetOTPConfirmScreen = ({navigation, route}) => {
  const {email, resendTime} = route.params || {}; // Add resendTime from navigation
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isValid = otpCode.trim().length === 6;

  const [resendTimer, setResendTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const timerRef = useRef(null);

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!resendTime) return;

    const expireTime = new Date(new Date(resendTime).getTime() + 60 * 1000);
    console.log('Expire time:', expireTime);

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
        email: email,
        code: null,
      };

      const response = await RequestOTP(postBody);

      if (response?.result) {
        navigation.setParams({resendTime: response?.codeExpireDate});
        console.log('OTP resent successfully:', response);
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

  const handleConfirmCode = async () => {
    setLoading(true);
    try {
      const postBody = {
        phone: null,
        email: email,
        code: otpCode,
      };
      const response = await VerifyOTp(postBody);

      if (response?.result && response?.token) {
        navigation.navigate('CreateNewPin', {
          email: email,
          token: response.token,
        });
      } else {
        setAlertVisible(true);
        setErrorMessage(response?.message || 'Failed to verify OTP');
        console.warn('Failed to verify OTP or missing token.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        title={'Something went wrong'}
        message={errorMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />

      <HeaderComponent
        title={'Confirmation Code'}
        onPress={() => navigation.goBack()}
        contentContainerStyle={{margin: 16, marginBottom: 0}}
      />
      <ProgressBar currentStep={1} totalSteps={2} />
      <CustomInput
        label={'Confirmation Code'}
        bgColor="#f2f2f2"
        contentContainerStyle={{marginHorizontal: 16}}
        placeholder={'Enter 6-digit otp code'}
        maxLength={6}
        value={otpCode}
        onChangeText={setOtpCode}
        keyboardType="number-pad"
      />

      {/* Countdown timer display below input */}
      {resendTimer > 0 ? (
        <Text style={[styles.resendText, {marginTop: 6, marginHorizontal: 16}]}>
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

      <View style={styles.bottomSection}>
        <View style={styles.resendWrapper}>
          {resendLoading ? (
            <Text style={styles.resendText}>Sending...</Text>
          ) : resendTimer === 0 ? (
            <Text style={styles.resendText}>
              No OTP yet?{' '}
              <Text style={styles.resendLink} onPress={resendOTPCode}>
                Resend Confirmation code
              </Text>
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          disabled={!isValid || loading || resendLoading}
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          onPress={handleConfirmCode}>
          <Text style={styles.buttonText}>
            {loading ? 'Proceeding...' : 'Send Email'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetOTPConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSection: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 16,
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
  resendWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 6,
    marginHorizontal: 16,
  },
  resendText: {
    color: '#888',
    fontSize: 14,
  },
  resendLink: {
    color: '#0f1b2a',
    fontWeight: '700',
  },
});
