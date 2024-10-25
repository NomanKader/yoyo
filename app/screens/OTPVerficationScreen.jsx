import { ScrollView } from 'react-native-gesture-handler';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import { CommonStyles } from '../style/CommonStyles';
import { Text, View, ActivityIndicator, TextInput } from 'react-native';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from '../components/Button/DefaultButtonComponent';
import theme from '../style/colors';
import React, { useState, useRef, useEffect } from 'react';
import OtpInputComponent from '../components/TextInput/OTPInputComponent';
import TextInputComponent from '../components/TextInput/TextInputComponent';

export default function OTPVerificationScreen({ navigation, route }) {
  const { email: emailFromParams } = route.params || {};
  const [email, setEmail] = useState(emailFromParams || '');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill('')); // 6 empty strings for OTP input fields
  const [timer, setTimer] = useState(300); // 5 minutes (300 seconds)
  const [showCountDown, setShowCountDown] = useState(false);

  // Create a persistent ref array that doesn't change between renders
  const otpRefs = useRef(Array(6).fill(0).map(() => React.createRef()));

  useEffect(() => {
    if (emailFromParams) {
      setEmail(emailFromParams);
    }

    // Countdown logic for the OTP expiration timer
    const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setShowCountDown(false); // Hide countdown when time is up
            return 0;
          }
        });
      }, 1000);

    // Cleanup the interval when component unmounts
    return () =>[clearInterval(interval),setShowCountDown(false)];
  }, [emailFromParams]);

  const handleSendCode = () => {
    if (email === '') {
      alert('Please enter a valid email');
      return;
    }

    setLoading(true); // Show loading

    // Simulate an API call
    setTimeout(() => {
      setLoading(false); // Stop loading after API call finishes
      setTimer(300); // Reset the countdown
      setShowCountDown(true);
    }, 2000); // Simulating a 2-second API call
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Set OTP and move focus to next input if available
    setOtp(newOtp);

    if (value !== '' && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].current.focus(); // Move to the next input
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle the backspace key press
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1].current.focus(); // Move to the previous input
    }
  };

  const renderOtpInputs = () => {
    return otp.map((digit, index) => (
      <OtpInputComponent
        key={index}
        value={digit}
        onChange={value => handleOtpChange(value, index)}
        onKeyPress={e => handleKeyPress(e, index)} // Detect backspace
        ref={otpRefs.current[index]} // Assign refs to each input field
      />
    ));
  };

  // Check if all OTP fields are filled
  const allFieldsFilled = otp.every(digit => digit !== '');

  // Convert timer to MM:SS format
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <ScrollView contentContainerStyle={CommonStyles.scrollViewContainer}>
      <DetailAppBarComponent title={'Verification'} navigation={navigation} />
      <DividerComponent />
      <View style={CommonStyles.dividerView}>
        <Text style={CommonStyles.text}>Verification</Text>
        <Text style={CommonStyles.subHeader}>
          We will send OTP code to your email address.
        </Text>

        <View style={CommonStyles.dividerView}>
          <TextInputComponent
            placeholder={'Please enter email'}
            value={email}
            onChangeText={setEmail}
            isSecure={false}
          />
        </View>

        <View style={CommonStyles.dividerView}>
          {showCountDown === false && (
            <DefaultButtonComponent
              title={
                loading ? (
                  <ActivityIndicator color={theme.colors.textLight} />
                ) : (
                  'Send Code'
                )
              } // Show loader or title
              backgroundColor={theme.colors.primary}
              color={theme.colors.textLight}
              onPress={handleSendCode} // Attach handler to the button
              disabled={loading} // Disable button while loading
            />
          )}
        </View>
        {showCountDown && (
          <>
            {/* Countdown Timer */}
            <View style={CommonStyles.dividerView}>
              <Text style={CommonStyles.countDown}>
                * Code will expire in: {formatTime(timer)}
              </Text>
            </View>

            {/* OTP Input Fields */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {renderOtpInputs()}
            </View>

            {/* Check Current Email Button */}
            <View style={CommonStyles.dividerView}>
              <DefaultButtonComponent
                title={'Check Current Email'}
                backgroundColor={theme.colors.primary}
                onPress={() => console.log('Checking email...')}
                disable={!allFieldsFilled} // Disable button if all OTP fields are not filled
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
