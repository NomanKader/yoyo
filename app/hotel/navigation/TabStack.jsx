import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/DashboardScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import AccountScreen from '../screens/account/AccountScreen';
import RoomCategoryListScreen from '../screens/room/RoomCategoryListScreen';
import AppStack from './AppStack';

import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext';

// Image icons for non-vector tabs
import dashboardTabIcon from '../assets/icons/tab/dashboardTabIcon.png';
import bookingTabIcon from '../assets/icons/tab/bookingTabIcon.png';
import accountTabIcon from '../assets/icons/tab/profileTabIcon.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

const TabScreens = () => {
  const { translate } = useContext(LanguageContext);

  const tabNames = {
    Dashboard: translate?.navigation?.Dashboard,
    Settings: translate?.navigation?.Setting,
    Room: translate?.navigation?.Room,
    Booking: translate?.navigation?.Booking,
    Account: translate?.navigation?.Account,
  };

  return (
    <Tab.Navigator
      initialRouteName="Booking"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textDark,
        tabBarStyle: {
          display: 'flex',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Dashboard':
              return (
                <Image
                  source={dashboardTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
            case 'Booking':
              return (
                <Image
                  source={bookingTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
            case 'Room':
              return (
                <Icon
                  name="bed-outline"
                  size={size}
                  color={color}
                />
              );
            case 'Account':
              return (
                <Image
                  source={accountTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
            case 'Settings':
              return (
                <Icon
                  name="cog-outline"
                  size={size}
                  color={color}
                />
              );
            default:
              return null;
          }
        },
        tabBarLabel: tabNames[route.name],
      })}
    >
      <Tab.Screen name="Booking" component={BookingScreen} options={options} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={options} />
      <Tab.Screen name="Room" component={RoomCategoryListScreen} options={options} />
      <Tab.Screen name="Account" component={AccountScreen} options={options} />
      {/* <Tab.Screen name="Settings" component={SettingScreen} options={options} /> */}
    </Tab.Navigator>
  );
};

const BottomTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="TabScreen">
      <Stack.Screen name="TabScreen" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default BottomTabStack;
