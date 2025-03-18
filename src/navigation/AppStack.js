// import Screens
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ExploreStepScreen from '../screens/explore/ExploreStepScreen';
import SearchDetailScreen from '../screens/common/SearchDetailScreen';
import EditProfileScreen from '../screens/auth/EditProfileScreen';
import SettingScreen from '../screens/common/SettingScreen';
import FavouriteListScreen from '../screens/common/FavouriteListScreen';
import TransactionHistoryScreen from '../screens/common/TransactionHistoryScreen';
import FAQScreen from '../screens/common/FAQScreen';
import CompareScreen from '../screens/common/CompareScreen';
export default function AppStack() {
  const Stack = createStackNavigator();
  const hiddenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="explore"
        component={ExploreScreen}
        options={hiddenOptions}
      />
      <Stack.Screen
        name="exploreStep"
        component={ExploreStepScreen}
        options={hiddenOptions}
      />
      <Stack.Screen name="searchDetailScreen" component={SearchDetailScreen} />
      <Stack.Screen name="editProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="settingScreen" component={SettingScreen} />
      <Stack.Screen name="favoriteListScreen" component={FavouriteListScreen} options={hiddenOptions} />
      <Stack.Screen name="transactionHistoryScreen" component={TransactionHistoryScreen} options={hiddenOptions} />
      <Stack.Screen name="faqScreen" component={FAQScreen} options={hiddenOptions} />
      <Stack.Screen name="compareScreen" component={CompareScreen} options={hiddenOptions} />
    </Stack.Navigator>
  );
}
