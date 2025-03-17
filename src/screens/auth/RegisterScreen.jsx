import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import TextInputComponent from '../../components/Input/TextInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import CustomPhoneNumberTextInput from '../../components/Input/CustomePhoneNubmerTextInput';
import authIllustrationImage from '../../assets/images/authIllustration.png';
import theme from '../../styles/colors';
import {RegisterAPI} from '../../api/Auth/AuthController';
import DatePickerComponent from '../../components/Formik/DatePickerComponent';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';

const RegisterScreen = ({navigation}) => {
  const [formState, setFormState] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    pin: '',
    referralCode: '',
    birthDate: null,
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (key, value) => {
    setFormState(prev => ({...prev, [key]: value}));
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      Alert.alert(
        'Invalid Input',
        'Please ensure all fields are filled correctly.',
      );
      return;
    }

    setLoading(true);

    try {
      const postBody = {
        FullName: formState.username,
        UserName: formState.username,
        Email: formState.email,
        PhoneNumber: formState.phoneNumber,
        Address: formState.address,
        DateOfBirth: formState.birthDate,
        Password: formState.pin,
        ReferralCode: formState.referralCode,
      };

      console.log('Post Body:', postBody);

      // Simulate API call delay
      const response = await RegisterAPI(postBody);
      if (response.status) {
        navigation.navigate('AuthStack', {screen: 'otpVerification',params:{phoneNumber:formState.phoneNumber}});
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Register Error:', error);
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneNumberWithoutCode = formState.phoneNumber.replace(
      /^\+\d+\s/,
      '',
    );

    return (
      formState.username.length > 0 &&
      formState.fullName.length > 0 &&
      emailRegex.test(formState.email) &&
      formState.birthDate !== null &&
      phoneNumberWithoutCode.length >= 9 &&
      phoneNumberWithoutCode.length <= 11 &&
      formState.pin.length === 4
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <DetailAppBarComponent navigation={navigation} title={'Register'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <Image
            source={authIllustrationImage}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <TextInputComponent
          value={formState.username}
          onChangeText={value => handleInputChange('username', value)}
          label={'Username'}
          placeholder={'Enter your username'}
          contentContainerStyle={styles.inputSpacing}
        />
        <TextInputComponent
          value={formState.fullName}
          onChangeText={value => handleInputChange('fullName', value)}
          label={'Full Name'}
          placeholder={'Enter your username'}
          contentContainerStyle={styles.inputSpacing}
        />
        <TextInputComponent
          value={formState.email}
          onChangeText={value => handleInputChange('email', value)}
          label={'Email Address'}
          placeholder={'Enter your email'}
          contentContainerStyle={styles.inputSpacing}
        />
        <CustomPhoneNumberTextInput
          phoneNumber={formState.phoneNumber}
          setPhoneNumber={value => handleInputChange('phoneNumber', value)}
          contentContainerStyle={styles.inputSpacing}
        />
        <DatePickerComponent
          birthDate={formState.birthDate}
          setBirthDate={value =>
            setFormState(prev => ({...prev, birthDate: value}))
          }
          contentContainerStyle={styles.inputSpacing}
        />
        <TextInputComponent
          value={formState.address}
          onChangeText={value => handleInputChange('address', value)}
          label={'Address'}
          placeholder={'Enter your address'}
          contentContainerStyle={styles.inputSpacing}
        />
        <TextInputComponent
          value={formState.pin}
          onChangeText={value => handleInputChange('pin', value)}
          label={'Create pin'}
          maxLength={4}
          keyboardType={'numeric'}
          placeholder={'Enter your 4-digit pin'}
          contentContainerStyle={styles.inputSpacing}
        />
        <TextInputComponent
          value={formState.referralCode}
          onChangeText={value => handleInputChange('referralCode', value)}
          maxLength={6}
          keyboardType={'numeric'}
          label={'Referral code (optional)'}
          placeholder={'Enter referral code'}
          contentContainerStyle={styles.inputSpacing}
        />

        {/* Footer Section */}
        <View style={styles.footerContainer}>
          <View style={styles.signInContainer}>
            <Text>Already have an account?</Text>
            <Text
              style={styles.signInText}
              onPress={() => navigation.goBack()}>
              {' '}
              Sign in
            </Text>
          </View>

          <DefaultButtonComponent
            title={'Register'}
            backgroundColor={theme.colors.primary}
            buttonStyle={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          />
        </View>
      </ScrollView>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Registering...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: 200,
    height: 200,
  },
  inputSpacing: {
    marginBottom: 20,
  },
  footerContainer: {
    marginTop: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  signInText: {
    color: '#2979FF',
    fontWeight: 'bold',
  },
  registerButton: {
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
});
