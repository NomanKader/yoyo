import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} />      
    </Stack.Navigator>
  );
};

export default AuthStack;
