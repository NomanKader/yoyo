import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native'; // Import Image component
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Ionicons
import theme from '../style/colors';
import { LanguageContext } from '../context/LanguageContext'; // Import LanguageContext
import AppStack from './AppStack';
import Home from '../screens/Home/Home';
import List from '../screens/List/List';
import Bookmark from '../screens/Bookmark/Bookmark';
import Account from '../screens/Account/Account';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

const TabScreens = () => {
  const { translate } = useContext(LanguageContext);

  const tabNames = {
    Home: translate?.navigation?.Home,
    List: translate?.navigation?.List,
    Bookmark: translate?.navigation?.Bookmark,
    Account: translate?.navigation?.Account,
  };

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route})=>({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textGray,
        tabBarStyle: {
          display: 'flex',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon : ({color,size}) => {
          let iconComponent;

          switch(route.name){
            case 'Home':
              iconComponent=(
                <Icon 
                  name='home'
                  style={{fontSize:size,tintColor:color}}
                />
              );
            break;

            case 'List':
              iconComponent=(
                <Icon 
                  name='list'
                  style={{fontSize:size,tintColor:color}}
                />
              );
            break;

            case 'Bookmark':
              iconComponent=(
                <Icon 
                  name='bookmark'
                  style={{fontSize:size,tintColor:color}}
                />
              );
            break;

            case 'Account':
              iconComponent=(
                <Icon 
                  name='user'
                  style={{fontSize:size,tintColor:color}}
                />
              );
            break;
            default:
              iconComponent = null;
          }
          return (iconComponent)

        },
        tabBarLabel: tabNames[route.name]
      })}      
    >      
      <Tab.Screen name="Home" component={Home} options={options} />
      <Tab.Screen name="List" component={List} options={options} />
      <Tab.Screen name="Bookmark" component={Bookmark} options={options} />
      <Tab.Screen name="Account" component={Account} options={options} />
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
