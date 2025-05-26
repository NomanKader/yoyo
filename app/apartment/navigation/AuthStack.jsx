import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../../common/auth/LoginScreen';
import LoginScreen1 from '../../common/auth/LoginScreen1';
import RegisterScreen from '../../common/auth/RegisterScreen';
import OTPScreen from '../../common/auth/OTPScreen';
import ForgetPinScreen from '../../common/auth/ForgetPINScreen';
import CreatePinScreen from '../../common/auth/CreatePINScreen';
import LocationInfoScreen from '../../common/auth/LocationInfoScreen';
import DocumentUploadScreen from '../../common/auth/DocumentUploadScreen';
import AppStack from '../../hotel/navigation/AppStack';
import TypeOfPropertyScreen from '../../common/auth/TypeOfPropertyScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Hide default header, custom back icons used in screens
      }}
    >      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TypeOfProperty" component={TypeOfPropertyScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ForgetPin" component={ForgetPinScreen} />
      <Stack.Screen name="CreatePin" component={CreatePinScreen} />
      <Stack.Screen name="LocationInfo" component={LocationInfoScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="HotelAppStack" component={AppStack} />
    </Stack.Navigator>
  );
}
