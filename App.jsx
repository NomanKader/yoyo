import React,{useEffect, useState} from "react";
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessTokenService from "./app/helper/AccessTokenService";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import UnauthorizedScreen from "./app/screens/UnauthorizedScreen";
export default function App(){  
  const Stack=createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="home" component={HomeScreen} options={{title:"Welcome to YoYo",headerBackVisible:false}}/>
        <Stack.Screen name="unauthorized" component={UnauthorizedScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}