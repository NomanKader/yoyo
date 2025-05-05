import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import your tab stack and other screens
import TabStack from './TabStack'; 
import SettingScreen from '../screens/tabs/SettingTabScreen'; 
import HomeDetailScreen from '../screens/common/HomeDetailScreen';

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
      <Stack.Screen name="HomeDetailScreen" component={HomeDetailScreen}/>
    </Stack.Navigator>
  );
}
