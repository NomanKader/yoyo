import React, {useState, useEffect, createContext, useContext} from 'react';
import {StatusBar, View, ActivityIndicator, StyleSheet} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from './app/apartment/i18n/i18n';
import {HotelLanguageProvider} from './app/hotel/context/LanguageContext';
import {LanguageProvider} from './app/apartment/context/LanguageContext';

import ApartmentAppStack from './app/apartment/navigation/AppStack';
import AuthStack from './app/apartment/navigation/AuthStack';
import HotelTabStack from './app/hotel/navigation/TabStack';
import RoleSelectorStack from './app/common/navigation/RoleSelectorStack';
import theme from './app/apartment/style/colors';

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
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // 🚀 Loading indicator

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('userRole');
        console.log('Auth Check - Token:', token, 'Role:', role);

        if (token && role) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
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
    if (!isAuthenticated) return <AuthStack />;
    if (userRole === 'apartment') return <ApartmentAppStack />;
    if (userRole === 'hotel') return <HotelTabStack />;
    if (userRole === 'both') return <RoleSelectorStack />;
    return <AuthStack />;
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <HotelLanguageProvider>
            <AuthContext.Provider
              value={{
                isAuthenticated,
                setIsAuthenticated,
                userRole,
                setUserRole,
              }}>
              <NavigationContainer theme={MyTheme}>
                <StatusBar
                  backgroundColor={theme.colors.primary}
                  barStyle="light-content"
                  translucent={false}
                />
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.primary}
                    />
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
