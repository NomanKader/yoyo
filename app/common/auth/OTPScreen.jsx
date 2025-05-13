import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import BackIcon from '../../apartment/assets/icons/backIcon.png';
import {OtpInput} from 'react-native-otp-entry';
import theme from '../../apartment/style/colors';
import DividerComponent from '../../apartment/components/Divider/DividerComponent';

const OTPScreen = ({navigation}) => {
  const [otpCode, setOtpCode] = useState('');
  const handleOTPChange = code => {
    setOtpCode(code);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>OTP Verification</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={{marginHorizontal: -20, marginTop: 20}}>
        <DividerComponent />
      </View>

      {/* OTP Input */}
      <Text style={styles.label}>OTP Code</Text>
      <OtpInput
        numberOfDigits={6}
        onTextChange={handleOTPChange}
        focusColor={theme.colors.primary}
        focusStickBlinkingDuration={500}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.otpBox,
          pinCodeTextStyle: styles.otpText,
          focusStickStyle: styles.focusStick,
        }}
        secureTextEntry={true}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.noOtpText}>No OTP yet? </Text>
          <Text style={styles.link}>Resend OTP</Text>
        </TouchableOpacity>

        <DefaultButtonComponent title="Verify OTP" />
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#000',
  },
  headerSpacer: {
    width: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 40,
    marginBottom: 10,
  },
  otpContainer: {
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  otpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  focusStick: {
    width: 2,
    height: 24,
    backgroundColor: '#00CFC8',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  noOtpText: {
    color: '#888',
  },
  link: {
    color: '#007BFF',
    fontWeight: '500',
  },
});
