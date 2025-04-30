import React, { useState, useEffect, createContext, useContext } from 'react';
import { StatusBar } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import i18n from './app/src/i18n/i18n';
import { LanguageProvider } from './app/src/context/LanguageContext';
import AppStack from './app/src/navigation/AppStack';
import AuthStack from './app/src/navigation/AuthStack'; // ✅ Import
import theme from './app/src/style/colors';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.primary,
    card: '#FFFFFF',
    text: '#000000',
    primary: '#0047AB',
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 🔐 simulate auth

  useEffect(() => {
    // Simulate auth check, you can integrate SecureStorage or AsyncStorage here
    const token = null; // e.g. get from storage
    setIsAuthenticated(!!token);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <NavigationContainer theme={MyTheme}>
            <StatusBar
              backgroundColor={theme.colors.primary}
              barStyle="light-content"
              translucent={false}
            />
            {/* 🔁 Show stack based on login status */}
            {isAuthenticated ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
        </AuthContext.Provider>
      </LanguageProvider>
    </I18nextProvider>
  );
}
