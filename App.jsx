import React, { useState, useEffect, createContext, useContext } from 'react';
import { StatusBar, View, ActivityIndicator, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from './app/apartment/i18n/i18n';
import { HotelLanguageProvider } from './app/hotel/context/LanguageContext';
import { LanguageProvider } from './app/apartment/context/LanguageContext';

import AuthStack from './app/common/navigation/AuthStack';
import AppStack from './app/common/navigation/AppStack'; // ✅ import updated AppStack
import theme from './app/apartment/style/colors';
import { navigationRef } from './app/common/navigation/NavigationService';

// 🔐 Create Auth Context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// 🎨 Custom theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.textLight,
    card: '#FFFFFF',
    text: '#000000',
    primary: '#0047AB',
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error reading auth state:', err);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const renderNavigator = () => {
    return isAuthenticated ? <AppStack /> : <AuthStack />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <HotelLanguageProvider>
            <AuthContext.Provider
              value={{
                isAuthenticated,
                setIsAuthenticated,
                setLoading,
              }}
            >
              <NavigationContainer theme={MyTheme} ref={navigationRef}>
                <StatusBar
                  backgroundColor={theme.colors.primary}
                  barStyle="light-content"
                  translucent={false}
                />
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                ) : (
                  renderNavigator()
                )}
              </NavigationContainer>
            </AuthContext.Provider>
          </HotelLanguageProvider>
        </LanguageProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.textLight,
  },
});
