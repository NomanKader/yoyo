import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UnauthorizedScreen from '../screens/UnauthorizedScreen';
import { AuthContext } from '../context/AuthContext';
import RoomDetailScreen from '../screens/room/RoomDetailScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Unauthorized'}>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: 'Welcome To YoYo' }} />
      <Stack.Screen name='Unauthorized' component={UnauthorizedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppStack;
