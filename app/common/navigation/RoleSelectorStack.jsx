import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseAccountScreen from '../ChooseAccountScreen';
import HotelStack from '../../hotel/navigation/AppStack';
import ApartmentStack from '../../apartment/navigation/AppStack';
import BottomTabStack from '../../hotel/navigation/TabStack';

const Stack = createNativeStackNavigator();

const RoleSelectorStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChooseAccount" component={ChooseAccountScreen} />
    <Stack.Screen name="HotelStack" component={HotelStack} />
    <Stack.Screen name="ApartmentStack" component={ApartmentStack} />
    <Stack.Screen name="HotelTabStack" component={BottomTabStack} />
  </Stack.Navigator>
);

export default RoleSelectorStack;
