import React, { useState, useEffect, createContext, useContext } from 'react';
import { StatusBar } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import i18n from './app/apartment/i18n/i18n';
import {HotelLanguageProvider} from './app/hotel/context/LanguageContext';
import { LanguageProvider } from './app/apartment/context/LanguageContext';

import ApartmentAppStack from './app/apartment/navigation/AppStack';
import AuthStack from './app/apartment/navigation/AuthStack';
import HotelTabStack from './app/hotel/navigation/TabStack';
import theme from './app/apartment/style/colors';
import RoleSelectorStack from './app/common/navigation/RoleSelectorStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  const [userRole, setUserRole] = useState(null); // 'apartment', 'hotel', or 'both'

  useEffect(() => {
    // TODO: replace with secure token/role storage logic
    const token = null;
    setIsAuthenticated(!!token);
  }, []);

  // 🌐 Render based on auth & role
  const renderNavigator = () => {
    if (!isAuthenticated) return <AuthStack />;
    if (userRole === 'apartment') return <ApartmentAppStack />;
    if (userRole === 'hotel') return <HotelTabStack/>;
    if (userRole === 'both') return <RoleSelectorStack />;
    return <AuthStack />; // fallback
  };

  return (
    <GestureHandlerRootView >
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <HotelLanguageProvider>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
          <NavigationContainer theme={MyTheme}>
            <StatusBar
              backgroundColor={theme.colors.primary}
              barStyle="light-content"
              translucent={false}
            />
            {renderNavigator()}
          </NavigationContainer>
        </AuthContext.Provider>
        </HotelLanguageProvider>
      </LanguageProvider>
    </I18nextProvider>
    </GestureHandlerRootView>
  );
}
