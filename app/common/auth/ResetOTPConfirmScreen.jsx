import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import ProgressBar from '../components/ProgessBarComponent';
import CustomInput from '../../apartment/components/Input/CustomInput';
import {RequestOTP, VerifyOTp} from '../service/AuthService';

const ResetOTPConfirmScreen = ({navigation, route}) => {
  const {email} = route.params || {};
  const [resendLoading, setResendLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const isValid = otpCode.trim().length === 6;

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
      console.log('OTP Code:', postBody);

      const response = await VerifyOTp(postBody);

      if (response?.result && response?.token) {
        navigation.navigate('CreateNewPin', {
          email: email,
          token: response.token,
        });
      } else {
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

      <View style={styles.bottomSection}>
        <View style={styles.resendWrapper}>
          {resendLoading ? (
            <Text style={styles.resendText}>Sending...</Text>
          ) : (
            <Text style={styles.resendText}>
              No OTP yet?{' '}
              <Text style={styles.resendLink} onPress={resendOTPCode}>
                Resend Confirmation code
              </Text>
            </Text>
          )}
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
  resendText: {
    color: '#888',
    fontSize: 14,
  },
  resendLink: {
    color: '#0f1b2a',
    fontWeight: '700',
  },
});
