// app/navigation/TabStack.jsx
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingScreen';
import RoomScreen from '../screens/room/RoomScreen';
import BookingScreen from '../screens/BookingScreen';
import AccountScreen from '../screens/AccountScreen';
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext'; // Import LanguageContext
import AppStack from './AppStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Create a Stack Navigator

const options = {
  headerShown: false
};

const TabScreens = () => {
  const { translate } = useContext(LanguageContext);  
  // Define tab names based on language
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
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'apps';
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          } else if (route.name === 'Room') {
            iconName = 'bed';
          } else if (route.name === 'Booking') {
            iconName = 'calendar';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }

          // Return the icon component with the correct label based on language
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: tabNames[route.name], // Set the label dynamically based on tabNames
      })}
    >
      <Tab.Screen name="Booking" component={BookingScreen} options={options}/>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={options} />
      <Tab.Screen name="Room" component={RoomScreen} options={options}/>      
      <Tab.Screen name="Account" component={AccountScreen} options={options}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={options}/>
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
