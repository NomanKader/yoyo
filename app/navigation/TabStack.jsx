import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native'; // Import Image component
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import DashboardScreen from '../screens/DashboardScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import AccountScreen from '../screens/account/AccountScreen';
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext'; // Import LanguageContext
import AppStack from './AppStack';
import RoomCategoryListScreen from '../screens/room/RoomCategoryListScreen';
import dashboardTabIcon from '../assets/icons/tab/dashboardTabIcon.png';
import bookingTabIcon from '../assets/icons/tab/bookingTabIcon.png';
import roomTabIcon from '../assets/icons/tab/roomTabIcon.png';
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
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textGray,
        tabBarStyle: {
          display: 'flex',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          switch (route.name) {
            case 'Dashboard':
              iconComponent = (
                <Image
                  source={dashboardTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
              break;
            case 'Booking':
              iconComponent = (
                <Image
                  source={bookingTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
              break;
            case 'Room':
              iconComponent = (
                <Image
                  source={roomTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
              break;
            case 'Account':
              iconComponent = (
                <Image
                  source={accountTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
              break;
            case 'Settings':
              iconComponent = (
                <Icon
                  name="cog-outline"
                  size={size}
                  color={color}
                />
              );
              break;
            default:
              iconComponent = null;
          }

          return iconComponent;
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
    <Stack.Navigator>
      <Stack.Screen name="TabScreens" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default BottomTabStack;
