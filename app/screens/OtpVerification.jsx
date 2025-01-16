import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import theme from '../style/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import {CommonStyles} from '../style/CommonStyles';

const {width, height} = Dimensions.get('window');

const OtpVerification = ({navigation}) => {
  const [otp, setOtp] = useState('');

  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = () => {
    setShowLoading(true);
    // Basic validation
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password.');
      setShowLoading(false);
      return;
    }
    LoginService({username, password}, navigation, setShowLoading);
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={CommonStyles.container}>
        <DetailAppBarComponent
          title="OTP Verification"
          navigation={navigation}
        />
        <DividerComponent />
        <View style={CommonStyles.scrollViewContainer}>
          <View style={styles.fullWidth}>
            <View style={styles.inputContainer}>
              <TextInputComponent
                label="OTP Code"
                placeholder="Enter 6 digit otp code..."
                value={otp}
                onChangeText={setOtp}
                keyboardType=""
                isSecure={false}
              />
            </View>

            {showLoading && <ActivityIndicator size="large" />}

            <View>
              <Text style={[styles.createAccountText, styles.marginBottom20]}>
                No OTP yet?
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={[styles.signUpText, styles.marginLeft5]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </Text>

              <DefaultButtonComponent
                title="Verify OTP"
                backgroundColor={theme.colors.primary}
                onPress={() => {
                  navigation.replace('TabStack');
                }}
                color={theme.colors.textLight}
                otherStyle={styles.verifyButtonStyle}
                otherTextStyle={styles.verifyButtonTextStyle}
                disable={showLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: height * 0.57,
  },
  createAccountText: {
    color: theme.colors.infoText,
    textAlign: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  verifyButtonStyle: {
    width: width * 0.9,
    height: height * 0.07,
  },
  verifyButtonTextStyle: {
    fontSize: 14,
  },
});

export default OtpVerification;
