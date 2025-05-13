import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../../common/auth/LoginScreen';
import RegisterScreen from '../../common/auth/RegisterScreen';
import OTPScreen from '../../common/auth/OTPScreen';
import ForgetPinScreen from '../../common/auth/ForgetPINScreen';

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
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ForgetPin" component={ForgetPinScreen} />
    </Stack.Navigator>
  );
}
