import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, View, Text} from 'react-native';
import theme from '../style/colors';

import ApartmentHomeScreen from '../screens/Apartment/ApartmentHomeScreen';
import ApartmentMapScreen from '../screens/Apartment/ApartmentMapScreen';
import ApartmentSearchScreen from '../screens/Apartment/ApartmentSearchScreen';
import ApartmentActivityScreen from '../screens/Apartment/ApartmentActivityScreen';
import ApartmentProfileScreen from '../screens/Apartment/ApartmentProfileScreen';

import activityIcon from '../assets/icons/apartmentTab/activity.png';
import homeIcon from '../assets/icons/apartmentTab/home.png';
import mapIcon from '../assets/icons/apartmentTab/map.png';
import searchIcon from '../assets/icons/apartmentTab/search.png';
import unSelectedMapIcon from '../assets/icons/apartmentTab/unselectedMap.png';
import profileIcon from '../assets/icons/apartmentTab/profile.png';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'ApartmentHome',
    component: ApartmentHomeScreen,
    label: 'Home',
    icon: homeIcon,
  },
  {
    name: 'ApartmentMap',
    component: ApartmentMapScreen,
    label: 'Map',
    icon: mapIcon,
    unselectedIcon: unSelectedMapIcon,
  },
  {
    name: 'ApartmentSearch',
    component: ApartmentSearchScreen,
    label: 'Search',
    icon: searchIcon,
  },
  {
    name: 'ApartmentActivity',
    component: ApartmentActivityScreen,
    label: 'Activity',
    icon: activityIcon,
  },
  {
    name: 'ApartmentProfile',
    component: ApartmentProfileScreen,
    label: 'Profile',
    icon: profileIcon,
  },
];

const ApartmentTabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarInactiveTintColor: theme.colors.bottomUnselectedColor,
        tabBarActiveTintColor: theme.colors.primary,
      }}>
      {tabScreens.map(({name, component, label, icon, unselectedIcon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: focused
                      ? theme.colors.primary
                      : theme.colors.bottomUnselectedColor,
                    fontSize: 14,
                  }}>
                  {label}
                </Text>
                <View
                  style={{
                    width: 60,
                    height: 6,
                    backgroundColor: focused
                      ? theme.colors.primary
                      : 'transparent',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    marginTop: 4,
                    marginBottom: -8,
                  }}
                />
              </View>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? icon : unselectedIcon || icon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused
                    ? theme.colors.primary
                    : theme.colors.bottomUnselectedColor,
                }}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default ApartmentTabStack;
