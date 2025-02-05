import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import theme from '../style/colors';
import loginImg from '../assets/images/login.png';
import googleIcon from '../assets/icons/googleIcon.png';
import fbIcon from '../assets/icons/facebookIcon.png';
import appleIcon from '../assets/icons/appleIcon.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import FormikTextInputComponent from '../components/Formik/FormikTextInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import {CommonStyles} from '../style/CommonStyles';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import SocialLoginButtonComponent from '../components/Button/SocialLoginButtonComponent';
import {Formik} from 'formik';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);

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

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    pin: Yup.string().required('Pin is required'),
  });

  const handleLogin = async (values, {resetForm}) => {
    console.log('values', values);
    // setShowLoading(true);

    // Basic validation
    // if (email === '' || password === '') {
    // Alert.alert('Error', 'Testing');

    //   setShowLoading(false);
    //   return;
    // }
    // setShowLoading(false);
    navigation.navigate('OtpVerificationScreen');
    // LoginService({email, password}, navigation, setShowLoading);
  };

  // const isButtonDisabled = email === '' || password === '';

  return (
    <SafeAreaView style={styles.flexContainer}>
      <ScrollView style={CommonStyles.container}>
        <DetailAppBarComponent title="Login" navigation={navigation} />
        <DividerComponent />

        <View style={CommonStyles.scrollViewContainer}>
          <Image
            source={loginImg}
            resizeMode="cover"
            style={styles.loginImage}
            alt="Login image"
          />
          <View>
            <Formik
              validationSchema={validationSchema}
              initialValues={{email: 'test@gmail.com', pin: '1234'}}
              onSubmit={handleLogin}>
              {formikProps => (
                <>
                  <FormikTextInputComponent
                    label="Email Address"
                    placeholder="Email address..."
                    // value={email}
                    // onChangeText={setEmail}
                    keyboardType="email-address"
                    isSecure={false}
                    formikKey="email"
                    formikProps={formikProps}
                  />

                  <FormikTextInputComponent
                    label="Pin"
                    placeholder="Enter 4 digit pin..."
                    // value={password}
                    // onChangeText={setPassword}
                    keyboardType="numeric"
                    isSecure={true}
                    formikKey="pin"
                    formikProps={formikProps}
                  />

                  <TouchableOpacity
                    style={styles.forgetPasswordButton}
                    onPress={() => navigation.navigate('ForgetPasswordScreen')}>
                    <Text style={styles.forgetPasswordText}>Forgot Pin</Text>
                  </TouchableOpacity>

                  <DefaultButtonComponent
                    title="Login"
                    backgroundColor={theme.colors.primary}
                    onPress={formikProps.handleSubmit}
                    color={theme.colors.textLight}
                    otherStyle={styles.loginButtonStyle}
                    otherTextStyle={styles.loginButtonTextStyle}
                  />
                </>
              )}
            </Formik>

            {showLoading && <ActivityIndicator size="large" />}

            <Text style={styles.createAccountText}>
              Dont have an account?
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </Text>

            <Text style={styles.orSignUpText}>Or sign up with</Text>
            <View style={styles.socialLoginContainer}>
              <SocialLoginButtonComponent
                onPress={() => {}}
                image={googleIcon}
              />
              <SocialLoginButtonComponent onPress={() => {}} image={fbIcon} />
              <SocialLoginButtonComponent
                onPress={() => {}}
                image={appleIcon}
                width={40}
                height={40}
                marginRight={0}
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
  loginImage: {
    width: '100%',
    height: 223,
  },
  forgetPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgetPasswordText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  loginButtonStyle: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
  },
  loginButtonTextStyle: {
    fontSize: 16,
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
  orSignUpText: {
    color: theme.colors.textDark,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
