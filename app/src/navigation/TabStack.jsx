import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Using Feather icons

// Screens
import HomeTabScreen from "../screens/tabs/HomeTabScreen";
import NotiTabScreen from "../screens/tabs/NotiTabScreen";
import ProfileTabScreen from "../screens/tabs/ProfileTabScreen";
import SettingScreen from "../screens/common/SettingScreen";


const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0047AB", // Active icon color (Blue)
        tabBarInactiveTintColor: "#A0A0A0", // Inactive icon color (Gray)
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Notification") {
            iconName = "bell";
          } else if (route.name === "Profile") {
            iconName = "user";
          }else if (route.name === "Setting") {
            iconName = "settings";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ fontSize: 12, color, marginTop: 2 }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeTabScreen} />      
      <Tab.Screen name="Notification" component={NotiTabScreen} />
      <Tab.Screen name="Profile" component={ProfileTabScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}
