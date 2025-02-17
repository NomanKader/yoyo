import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApartmentActivityScreen from '../screens/BottomTabApartment/ApartmentActivityScreen';
import ApartmentProfileScreen from '../screens/BottomTabApartment/ApartmentProfileScreen';
import activityIcon from "../assets/icons/apartmentTab/activity.png";
import homeIcon from "../assets/icons/apartmentTab/home.png";
import mapIcon from "../assets/icons/apartmentTab/map.png";
import searchIcon from "../assets/icons/apartmentTab/search.png";
import unSelectedMapIcon from "../assets/icons/apartmentTab/unselectedMap.png";
import profileIcon from "../assets/icons/apartmentTab/profile.png";

import { Image } from 'react-native';
import theme from '../style/colors';
import ApartmentHomeScreen from '../screens/BottomTabApartment/ApartmentHomeScreen';
import ApartmentMapScreen from '../screens/BottomTabApartment/ApartmentMapScreen';
import ApartmentSearchScreen from '../screens/BottomTabApartment/ApartmentSearchScreen';

const Tab = createBottomTabNavigator();

const ApartmentTabStack = ({state}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,  // Adjust height as per your design
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarInactiveTintColor:theme.colors.bottomUnselectedColor,
        tabBarActiveTintColor:theme.colors.primary
      }}
    >
      <Tab.Screen
        name="ApartmentHome"
        component={ApartmentHomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}  
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? theme.colors.primary : theme.colors.bottomUnselectedColor,
              }}
            />
          ),
         
        }}
      />
      <Tab.Screen
        name="ApartmentMap"
        component={ApartmentMapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <Image
            source={focused ? mapIcon : unSelectedMapIcon}  
            style={{
                width: 30,
                height: 30,
                tintColor: focused ? theme.colors.primary : theme.colors.bottomUnselectedColor,
              }}
            />
          ),
         
        }}
      />
      <Tab.Screen
        name="ApartmentSearch"
        component={ApartmentSearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <Image
            source={searchIcon}  
            style={{
                width: 30,
                height: 30,
                tintColor: focused ? theme.colors.primary : theme.colors.bottomUnselectedColor,
              }}
            />
          ),
         
        }}
      />
      <Tab.Screen
        name="ApartmentActivity"
        component={ApartmentActivityScreen}
        options={{
          tabBarLabel: "Activity",
          tabBarIcon: ({ focused }) => (
            <Image
              source={activityIcon}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? theme.colors.primary : theme.colors.bottomUnselectedColor,
              }}
            />
          ),
          
        
            }}
      />
      <Tab.Screen
        name="ApartmentProfile"
        component={ApartmentProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
            source={profileIcon}  
            style={{
                width: 30,
                height: 30,
                tintColor: focused ? theme.colors.primary : theme.colors.bottomUnselectedColor,
              }}
            />
          ),
         
        }}
      />
    </Tab.Navigator>
  );
};

export default ApartmentTabStack;
