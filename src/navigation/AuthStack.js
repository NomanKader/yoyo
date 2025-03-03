import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/auth/LoginScreen';
import ConfirmEmailScreen from "../screens/auth/ConfirmEmailScreen";
import VerifyOTPScreen from "../screens/auth/VerifyOTPScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="createNewPassword"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="confirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="verifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="createNewPassword" component={CreateNewPasswordScreen} />
    </Stack.Navigator>
  );
}
