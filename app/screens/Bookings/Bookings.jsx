import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Hotel from './Active';
import Apartment from './Completed';
import AppBarComponent from '../../components/AppBar/AppBarComponent';
import theme from '../../style/colors';
import Active from './Active';
import Completed from './Completed';

const {width, height} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBg}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.tabButton, isFocused ? styles.activeTab : null]}>
              <Text
                style={[styles.tabText, isFocused ? styles.activeText : null]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TopBar = ({navigation}) => {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <>
      <AppBarComponent
        title="Bookings"
        navigation={navigation}
        search={false}
      />

      <TopTab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          swipeEnabled: false,
        }}>
        <TopTab.Screen name="Active" component={Active} />
        <TopTab.Screen name="Completed" component={Completed} />
      </TopTab.Navigator>
    </>
  );
};

const Bookings = ({navigation}) => {
  return <TopBar navigation={navigation} />;
};

export default Bookings;

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.textLight,
    paddingVertical: 10,
    paddingLeft: 20,
    //   borderBottomWidth: 1,
    //   borderBottomColor: '#ddd',
  },
  tabBg: {
    flexDirection: 'row',
    width: width * 0.83,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.bookingTabBarColor,
    borderRadius: 13,
    // flexShrink:1
  },
  tabButton: {
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.025,
    width: width * 0.39,
    alignItems: 'center',

    backgroundColor: theme.colors.bookingTabBarColor,
    borderRadius: 3,
  },
  activeTab: {
    //   borderBottomWidth: 2,
    //   borderBottomColor: 'white',
    backgroundColor: theme.colors.textLight,
  },
  tabText: {
    fontSize: 16,
    color: theme.colors.textDark,
  },
  activeText: {
    color: theme.colors.textDark,
    fontWeight: 'bold',
  },
});
