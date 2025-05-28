import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectPropertyScreen from '../auth/SelectPropertyScreen';
import ApartmentAppStack from '../../apartment/navigation/AppStack';
import HotelTabStack from '../../hotel/navigation/TabStack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectProperty" component={SelectPropertyScreen} />
      <Stack.Screen name="ApartmentAppStack" component={ApartmentAppStack} />
      <Stack.Screen name="HotelTabStack" component={HotelTabStack} />
    </Stack.Navigator>
  );
}
