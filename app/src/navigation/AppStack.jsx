import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import your tab stack and other screens
import TabStack from './TabStack'; 
import SettingScreen from '../screens/common/SettingScreen'; 

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      {/* TabStack wrapped inside a Stack.Screen */}
      <Stack.Screen name="MainTabs" component={TabStack} /> 
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}
