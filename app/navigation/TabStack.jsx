import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingScreen';
import RoomScreen from '../screens/RoomScreen';
import BookingScreen from '../screens/BookingScreen';
import AccountScreen from '../screens/AccountScreen';
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext'; // Import LanguageContext
import myanmarLanguage from '../config/myanmar';
import englishLanuage from '../config/english';
const Tab = createBottomTabNavigator();
const options={
  headerShown:false
}
const BottomTabStack = () => {
  const { language } = useContext(LanguageContext); // Access language state from LanguageContext
  console.log("Language",language);
  // Define tab names based on language
  const tabNames = {
    Dashboard: language === 'mm' ? myanmarLanguage.navigation.Dashboard : englishLanuage.navigation.Dashboard,
    Settings: language === 'mm' ? myanmarLanguage.navigation.Setting : englishLanuage.navigation.Setting,
    Room: language === 'mm' ? myanmarLanguage.navigation.Room : englishLanuage.navigation.Room,
    Booking: language === 'mm' ? myanmarLanguage.navigation.Booking : englishLanuage.navigation.Booking,
    Account: language === 'mm' ? myanmarLanguage.navigation.Account : englishLanuage.navigation.Account,
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

export default BottomTabStack;
