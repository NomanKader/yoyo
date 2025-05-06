import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import your tab stack and other screens
import TabStack from './TabStack'; 
import SettingScreen from '../screens/tabs/SettingTabScreen'; 
import HomeDetailScreen from '../screens/common/HomeDetailScreen';
import EditProfileScreen from '../screens/common/EditProfileScreen';
import FAQScreen from '../screens/common/FAQScreen';
import TransactionHistoryScreen from '../screens/common/TransactionHistoryScreen';
import DashboardScreen from '../screens/common/DashboardScreen';
import ManageBookingScreen from '../screens/common/ManageBookingScreen';
import CreateNewPropertyScreen from '../screens/common/CreateNewPropertyScreen';

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
      <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
      <Stack.Screen name="FAQ" component={FAQScreen}/>
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen}/>
      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      <Stack.Screen name="ManageBooking" component={ManageBookingScreen}/>
      <Stack.Screen name="CreateNewProperty" component={CreateNewPropertyScreen}/>
    </Stack.Navigator>
  );
}
