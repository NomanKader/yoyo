// import Screens
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ExploreStepScreen from '../screens/explore/ExploreStepScreen';
import SearchDetailScreen from '../screens/common/SearchDetailScreen';
import PropertiesDetailsScreen from '../screens/common/PropertiesDetailsScreen';
import EnquiryScreen from '../screens/common/EnquiryScreen';
export default function AppStack() {
  const Stack = createStackNavigator();
  const hiddenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
      <Stack.Screen
        name="propertiesDetailsScreen"
        component={PropertiesDetailsScreen}
      />
      <Stack.Screen name='enquiryScreen' component={EnquiryScreen}/>
    </Stack.Navigator>
  );
}
