import { ScrollView } from 'react-native-gesture-handler';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../style/CommonStyles';
import { Text, View, ActivityIndicator } from 'react-native';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import { useState } from 'react';

export default function ForgetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [showEmailHelper, setShowEmailHelper] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProceed = () => {
    if (email === '') {
      setEmailError('Please enter your email.');
      setShowEmailHelper(true);
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setShowEmailHelper(true);
    } else {
      setShowEmailHelper(false);
      setEmailError('');
      setLoading(true); // Start loading

      // Simulate sending code with timeout (replace with real API call)
      setTimeout(() => {
        setLoading(false); // Stop loading after request completes
        navigation.navigate('AuthStack', {
            screen: 'OTPVerification',
            params: { email }, // Pass email as parameter
          });
      }, 2000); // Simulated 2-second delay
    }
  };

  return (
    <ScrollView contentContainerStyle={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent
        title={'Forget Password'}
        navigation={navigation}
      />
      <DividerComponent />
      <View style={CommonStyles.dividerView}>
        <Text style={CommonStyles.text}>Forget Password?</Text>
        <Text style={CommonStyles.subHeader}>
          * Please enter your email so that we can send you a password reset link!
        </Text>
        <View style={CommonStyles.dividerView}>
          <TextInputComponent
            placeholder={'Please enter email'}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setShowEmailHelper(false); // Hide error as the user types
              setEmailError(''); // Clear error
            }}
            isSecure={false}
          />
          {/* Display error message if email is invalid */}
          {showEmailHelper && (
            <Text style={[CommonStyles.subHeader, { color: 'red' }]}>
              {emailError}
            </Text>
          )}
        </View>
        <View style={CommonStyles.dividerView}>
          <DefaultButtonComponent
            onPress={handleProceed}
            title={
              loading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={theme.colors.textLight} />
                  <Text style={{ marginLeft: 10, color: theme.colors.textLight }}>
                    Proceeding...
                  </Text>
                </View>
              ) : (
                'Proceed'
              )
            }
            backgroundColor={theme.colors.primary}
            color={theme.colors.textLight}
          />
        </View>
      </View>
    </ScrollView>
  );
}
