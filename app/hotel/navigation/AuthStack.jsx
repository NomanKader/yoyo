import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import UnauthorizedScreen from '../screens/UnauthorizedScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OTPVerficationScreen from '../screens/OTPVerficationScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // Define a variable to control header visibility
  const hiddenHeaderOptions = {headerShown: false};

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={hiddenHeaderOptions} // Use the variable here
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={hiddenHeaderOptions} // Use the variable here
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={hiddenHeaderOptions} // Use the variable here as well
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerficationScreen}
        options={hiddenHeaderOptions} // Use the variable here as well
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
