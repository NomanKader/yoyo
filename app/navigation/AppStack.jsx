import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UnauthorizedScreen from '../screens/UnauthorizedScreen';
import { AuthContext } from '../context/AuthContext';
import RoomDetailScreen from '../screens/room/RoomDetailScreen';
import RoomCategoryCreateScreen from '../screens/room/create/RoomCategoryCreateScreen';
import RoomFacilityCreateScreen from '../screens/room/create/RoomFacilityCreateScreen';
import RoomBasicFeatureScreen from '../screens/room/create/RoomBasicFeatureScreen';
import RoomBedroomDetailScreen from '../screens/room/create/RoomBedRoomDetailScreen';
import RoomViewScreen from '../screens/room/create/RoomViewScreen';
import RoomRuleScreen from '../screens/room/create/RoomRuleScreen';
import RoomPhotoScreen from '../screens/room/create/RoomPhotoScreen';
import SuccessScreenComponent from '../components/screen/SuccessScreenComponent';
import SearchScreen from '../components/screen/SearchScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const hiddenHeaderOptions = { headerShown: false };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: 'Welcome To YoYo' }} />
      <Stack.Screen name='Unauthorized' component={UnauthorizedScreen} options={hiddenHeaderOptions} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomCategoryCreate' component={RoomCategoryCreateScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomFacilityCreate' component={RoomFacilityCreateScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomBasicFeature' component={RoomBasicFeatureScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomBedroomDetail' component={RoomBedroomDetailScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomView' component={RoomViewScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomRule' component={RoomRuleScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='RoomPhoto' component={RoomPhotoScreen} options={hiddenHeaderOptions}/>
      <Stack.Screen name='SuccessScreen' component={SuccessScreenComponent} options={hiddenHeaderOptions}/>
      <Stack.Screen name='SearchScreen' component={SearchScreen} options={hiddenHeaderOptions}/>
    </Stack.Navigator>
  );
};

export default AppStack;
