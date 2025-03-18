import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Alert, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HomeTabScreen from '../screens/bottomTabs/HomeTabScreen';
import SearchTabScreen from '../screens/bottomTabs/SearchTabScreen';
import NotificationTabScreen from '../screens/bottomTabs/NotificationTabScreen';
import ProfileTabScreen from '../screens/bottomTabs/ProfileTabScreen';

const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Notification') {
            iconName = 'bell';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF', // Active tab color
        tabBarInactiveTintColor: '#555', // Inactive tab color
        tabBarShowLabel: true, // Show tab labels
        headerShown: false, // Hide header for all screens
      })}>
      <Tab.Screen name="Home" component={HomeTabScreen} />
      <Tab.Screen name="Search" component={SearchTabScreen} />
      <Tab.Screen name="Notification" component={NotificationTabScreen} />
      <Tab.Screen name="Profile" component={ProfileTabScreen} />
    </Tab.Navigator>
  );
}
