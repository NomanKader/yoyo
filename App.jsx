import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './src/navigation/AuthStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider style={{flexGrow: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthStack"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            {/* <Stack.Screen name="AppStack" component={AppStack} /> */}
            {/* <Stack.Screen name="TabStack" component={TabStack} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
