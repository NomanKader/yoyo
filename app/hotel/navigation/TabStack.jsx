import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/DashboardScreen';
import BookingScreen from '../screens/booking/BookingScreen';
import AccountScreen from '../screens/account/AccountScreen';
import RoomCategoryListScreen from '../screens/room/RoomCategoryListScreen';
import AppStack from './AppStack';

import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext';

import dashboardTabIcon from '../assets/icons/tab/dashboardTabIcon.png';
import bookingTabIcon from '../assets/icons/tab/bookingTabIcon.png';
import accountTabIcon from '../assets/icons/tab/profileTabIcon.png';
import BookingRoomCategoryScreen from '../screens/booking/BookingRoomCategoryScreen';
import { RoomContext } from '../context/RoomContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



// 🧩 Custom center tab button (Plus icon)
const CustomPlusButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -25,
      left: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      width: 48,
      height: 48,
      borderRadius: 24,
    }}
  >
    <Icon name="add" size={30} color="#fff" />
  </TouchableOpacity>
);

const TabScreens = () => {
  const { translate } = useContext(LanguageContext);
  const {type,setType}=useContext(RoomContext)
  const options = { headerShown: false,tabBarStyle: { display: type=='list'?'none':'flex' } };

  const tabNames = {
    Dashboard: translate?.navigation?.Dashboard || 'Dashboard',
    Booking: translate?.navigation?.Booking || 'Booking',
    Room: translate?.navigation?.Room || 'Rooms',
    Account: translate?.navigation?.Account || 'Account',
    Plus: '',
  };

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textDark,
        tabBarStyle: {          
          height: 60,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 12 },
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
              return <Icon name="bed-outline" size={size} color={color} />;
            case 'Account':
              return (
                <Image
                  source={accountTabIcon}
                  style={{ width: size, height: size, tintColor: color }}
                  resizeMode="contain"
                />
              );
            case 'Plus':
              return null; // Hidden - handled by custom button
            default:
              return null;
          }
        },
        tabBarButton: (props) => {
          if (route.name === 'Plus') {
            return <CustomPlusButton {...props} />;
          }
          return <TouchableOpacity {...props} />;
        },
        tabBarLabel: tabNames[route.name],
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={options} />
      <Tab.Screen name="Booking" component={BookingScreen} options={options} />
      <Tab.Screen name="Plus" component={BookingRoomCategoryScreen} options={options} />
      <Tab.Screen name="Room" component={RoomCategoryListScreen} options={options} />
      <Tab.Screen name="Account" component={AccountScreen} options={options} />
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
