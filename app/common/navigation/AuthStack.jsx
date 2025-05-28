import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../auth/LoginScreen';
import LoginScreen1 from '../auth/LoginScreen1';
import RegisterScreen from '../auth/RegisterScreen';
import OTPScreen from '../auth/OTPScreen';
import ForgetPinScreen from '../auth/ForgetPINScreen';
import CreatePinScreen from '../auth/CreatePINScreen';
import LocationInfoScreen from '../auth/LocationInfoScreen';
import DocumentUploadScreen from '../auth/DocumentUploadScreen';
import HotelAppStack from '../../hotel/navigation/AppStack';
import TypeOfPropertyScreen from '../auth/TypeOfPropertyScreen';
import {RegisterProvider} from '../utils/RegisterProvider';
import ResetOTPConfirmScreen from '../auth/ResetOTPConfirmScreen';
import CreateNewPinScreen from '../auth/CreateNewPinScreen';
import SelectPropertyScreen from '../auth/SelectPropertyScreen';
import ApartmentAppStack from '../../apartment/navigation/AppStack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <RegisterProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide default header, custom back icons used in screens
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TypeOfProperty" component={TypeOfPropertyScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ForgetPin" component={ForgetPinScreen} />
        <Stack.Screen name="CreatePin" component={CreatePinScreen} />
        <Stack.Screen name="LocationInfo" component={LocationInfoScreen} />
        <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />        
        <Stack.Screen name="HotelAppStack" component={HotelAppStack} />
        <Stack.Screen name="ApartmentAppStack" component={ApartmentAppStack} />
        <Stack.Screen name="SelectProperty" component={SelectPropertyScreen} />
        <Stack.Screen
          name="ResetOTPConfirm"
          component={ResetOTPConfirmScreen}
        />
        <Stack.Screen name="CreateNewPin" component={CreateNewPinScreen} />
      </Stack.Navigator>
    </RegisterProvider>
  );
}
