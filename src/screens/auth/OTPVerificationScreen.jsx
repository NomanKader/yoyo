import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import theme from '../../styles/colors';
import TextInputComponent from '../../components/Input/TextInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import {ResendOTP, VerifyOTP} from '../../api/Auth/AuthController';

const OTPVerificationScreen = ({navigation, route}) => {
  const {phoneNumber} = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResendOTP = async () => {
    const postBody = {
      phone: phoneNumber,
    };
    try {
      setLoading(true);
      const respone = await ResendOTP(postBody);
      if (respone.status) {
        Alert.alert(respone.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async() => {
    const postBody = {
      phone: phoneNumber,
      otp: otp,
    };
    console.log("verfiy",postBody)
    try {
      setLoading(true);
      const respone = await VerifyOTP(postBody);
      if (respone.status) {
        Alert.alert(respone.message);
      } else {
        Alert.alert(respone.message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DetailAppBarComponent title="OTP Verification" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <TextInputComponent
          value={otp}
          onChangeText={setOtp}
          label={'OTPCode'}
          placeholder={'Enter 6 digit OTP Code'}
          contentContainerStyle={styles.inputSpacing}
        />
        <View style={styles.resendContainer}>
          <Text style={styles.resendOTP}>
            No OTP yet?{' '}
            <Text style={styles.textOTPColor} onPress={handleResendOTP}>
              {' '}
              Resend OTP
            </Text>
          </Text>
        </View>
        <DefaultButtonComponent
          title={'Verify OTP'}
          backgroundColor={theme.colors.primary}
          onPress={handleVerifyOTP}
        />
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  inputSpacing: {
    marginTop: 20,
  },
  resendContainer: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  resendOTP: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  textOTPColor: {
    color: theme.colors.primary,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
