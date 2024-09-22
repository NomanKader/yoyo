import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native'; // Import Image component
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext'; // Import LanguageContext
import AppStack from './AppStack';


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
      initialRouteName=''      
    >      
      {/* <Tab.Screen name="Settings" component={SettingScreen} options={options} /> */}
    </Tab.Navigator>
  );
};

const BottomTabStack = () => {
  return (
    <Stack.Navigator initialRouteName='TabScreen'>
      <Stack.Screen name="TabScreen" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default BottomTabStack;
