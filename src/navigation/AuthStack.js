import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/auth/LoginScreen';
import ConfirmEmailScreen from "../screens/auth/ConfirmEmailScreen";
import VerifyOTPScreen from "../screens/auth/VerifyOTPScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AuthScreen from "../screens/auth/AuthScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="confirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="verifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="createNewPassword" component={CreateNewPasswordScreen} />
    </Stack.Navigator>
  );
}
