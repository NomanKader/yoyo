import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import TabStack from './src/navigation/TabStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { TranslationProvider } from './src/context/TranslationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StatusBar, Platform } from 'react-native';
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();

export default function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwt');
      setIsAuth(token !== null);
    };
    checkToken();
  }, []);

  return isAuth == null ? (
    <ActivityIndicator
      style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      size="large"
    />
  ) : (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flexGrow: 1 }}>
          <TranslationProvider>
            <StatusBar
              barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
              backgroundColor="#2979FF"
              translucent={false}
            />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={isAuth ? 'TabStack' : 'AuthStack'}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="AppStack" component={AppStack} />
                <Stack.Screen name="TabStack" component={TabStack} />
              </Stack.Navigator>
            </NavigationContainer>
            <Toast /> 
          </TranslationProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
