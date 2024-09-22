import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const hiddenHeaderOptions = { headerShown: false };

  return (
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      {/* <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={hiddenHeaderOptions}/> */}
    </Stack.Navigator>
  );
};

export default AppStack;
