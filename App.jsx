import React from 'react';
import { StatusBar } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import i18n from './app/src/i18n/i18n';
import { LanguageProvider } from './app/src/context/LanguageContext';
import AppStack from './app/src/navigation/AppStack';
import theme from './app/src/style/colors';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.primary, // ✅ Make background white
    card: '#FFFFFF',        // ✅ Navigation header background white
    text: '#000000',         // ✅ Default text black
    primary: '#0047AB',      // ✅ Your primary color (optional)
  },
};

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        {/* Navigation container with white background */}
        <NavigationContainer theme={MyTheme}>
          {/* Status Bar Control */}
          <StatusBar
            backgroundColor={theme.colors.primary} // ✅ White background
            barStyle="light-content"    // ✅ Dark text (black icons)
            translucent={false}        // ✅ Important for full height
          />
          <AppStack />
        </NavigationContainer>
      </LanguageProvider>
    </I18nextProvider>
  );
}
