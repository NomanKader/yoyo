import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext';
import AppStack from './AppStack';
import Home from '../screens/Home/Home';
import List from '../screens/List/List';
import Bookmark from '../screens/Bookmark/Bookmark';
import Account from '../screens/Account/Account';
import Bookings from '../screens/Bookings/Bookings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

const TabScreens = () => {
  const { translate } = useContext(LanguageContext);

  const tabNames = {
    Home: translate?.navigation?.Home,
    Bookings: translate?.navigation?.Bookings,
    Bookmark: translate?.navigation?.Bookmark,
    Account: translate?.navigation?.Account,
  };

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textGray,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 20,
          backgroundColor: theme.colors.textLight,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gridColor,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch(route.name) {
            case 'Home':
              iconName = focused ? 'document' : 'document-outline';
              break;
            case 'Bookings':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Bookmark':
              iconName = focused ? 'bookmark' : 'bookmark-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'square';
          }

          return (
            <View style={[
              styles.iconContainer,
              focused && styles.activeIconContainer
            ]}>
              <Icon 
                name={iconName}
                size={24}
                color={color}
                style={styles.icon}
              />
            </View>
          );
        },
      })}
    >      
      <Tab.Screen name="Home" component={Home} options={options} />
      <Tab.Screen name="Bookings" component={Bookings} options={options} />
      <Tab.Screen name="Bookmark" component={Bookmark} options={options} />
      <Tab.Screen name="Account" component={Account} options={options} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: '#EBF4FF',
  },
  icon: {
    marginBottom: 4,
  },
});

const BottomTabStack = () => {
  return (
    <Stack.Navigator initialRouteName='TabScreen'>
      <Stack.Screen name="TabScreen" component={TabScreens} options={{ headerShown: false }} />
      <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default BottomTabStack;
