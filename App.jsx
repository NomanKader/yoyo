import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabStack from "./app/navigation/TabStack";
import { AuthContext, AuthProvider } from "./app/context/AuthContext";
import { LanguageProvider } from "./app/context/LanguageContext";
import { ActivityIndicator, View, Text, StatusBar } from 'react-native';
import AuthStack from "./app/navigation/AuthStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Welcome to YoYo...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "TabStack" : "AuthStack"}>
        <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="TabStack" component={BottomTabStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView>
    <AuthProvider>
      <LanguageProvider>
        <StatusBar
          barStyle="dark-content" // Black text color
          backgroundColor="#ffffff" // White background color
        />
        <AppNavigator />
      </LanguageProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
