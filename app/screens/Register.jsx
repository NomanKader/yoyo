import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import theme from '../style/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import FormikTextInputComponent from '../components/Formik/FormikTextInputComponent';
import FormikPhoneInputComponent from '../components/Formik/FormikPhoneInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import {CommonStyles} from '../style/CommonStyles';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [refferCode, setRefferCode] = useState();
  const [showLoading, setShowLoading] = useState(false);

  // Check token valid
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await AccessTokenService._TokenValidation();
      if (isValid) {
        navigation.navigate('TabStack');
      } else {
        navigation.navigate('Login');
      }
    };
    // checkToken();
  }, []);

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

  const isButtonDisabled = username === '' || password === '';

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={CommonStyles.container}>
        <DetailAppBarComponent title="Register" navigation={navigation} />
        <DividerComponent />

        <View style={CommonStyles.scrollViewContainer}>
          <Image
            source={require('../assets/images/login.png')}
            resizeMode="cover"
            style={styles.loginImage}
            alt="Login image"
          />
          <View style={styles.fullWidth}>
            <Formik
              initialValues={{
                username: '',
                email: '',
                phone: '',
                pin: '',
                refferCode: '',
              }}
              onSubmit={(values, {resetForm}) => {
                console.log(values);
                navigation.navigate('OtpVerificationScreen');
              }}>
              {formikProps => (
                <>
                  <FormikTextInputComponent
                    label="Username"
                    placeholder="Username..."
                    formikKey="username"
                    formikProps={formikProps}
                    keyboardType=""
                    isSecure={false}
                  />

                  <FormikTextInputComponent
                    label="Email"
                    placeholder="Email..."
                    formikKey="email"
                    formikProps={formikProps}
                    keyboardType="email-address"
                    isSecure={false}
                  />
                  <FormikPhoneInputComponent
                    label="Phone"
                    formikProps={formikProps}
                    formikKey="phone"
                  />

                  <FormikTextInputComponent
                    label="Create Pin"
                    placeholder="Enter 4 digit pin..."
                    formikKey="pin"
                    formikProps={formikProps}
                    keyboardType="numeric"
                    isSecure={false}
                  />

                  <FormikTextInputComponent
                    label="Refferal code"
                    placeholder="Refferal code..."
                    formikKey="refferCode"
                    formikProps={formikProps}
                    keyboardType="numeric"
                    isSecure={false}
                  />

                  <Text style={[styles.createAccountText, styles.alignSelfEnd]}>
                    Already have an account?
                    <TouchableOpacity
                      onPress={() => navigation.navigate('LoginScreen')}>
                      <Text style={styles.signUpText}>Sign In</Text>
                    </TouchableOpacity>
                  </Text>

                  <DefaultButtonComponent
                    title="Register"
                    backgroundColor={theme.colors.primary}
                    onPress={formikProps.handleSubmit}
                    color={theme.colors.textLight}
                    otherStyle={styles.registerButtonStyle}
                    otherTextStyle={styles.registerButtonTextStyle}
                    // disable={isButtonDisabled || showLoading}
                  />
                </>
              )}
            </Formik>

            {showLoading && <ActivityIndicator size="large" />}
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
  loginImage: {
    width: '100%',
    height: 223,
  },
  fullWidth: {
    width: '100%',
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
    fontSize: 11,
  },
  alignSelfEnd: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  registerButtonStyle: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
  },
  registerButtonTextStyle: {
    fontSize: 16,
  },
});

export default Register;
