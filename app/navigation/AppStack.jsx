import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';

import RoomCategory from '../screens/Room/RoomCategory';
import RoomCategoryAll from '../screens/Room/RoomCategoryAll';

import RoomList from '../screens/Room/RoomList';
import RoomListAll from '../screens/Room/RoomListAll';

import ReservationForm from '../screens/Form/ReservationForm';
import ReserveMethod from '../screens/Form/ReserveMethod';
import ReserveConfirm from '../screens/FormConfirmPages/ReserveConfirm';
import PaymentForm from '../screens/Form/PaymentForm';
import ReserveSuccessful from '../screens/FormConfirmPages/ReserveSuccessful';
import CheckInDetail from '../screens/Room/CheckInDetail';
import RefundForm from '../screens/Form/RefundForm';
import PaymentComplete from '../screens/FormConfirmPages/PaymentComplete';
import RefundRequestComplete from '../screens/FormConfirmPages/RefundRequestComplete';
import BookingSuccessful from '../screens/FormConfirmPages/BookingSuccessful';
import ReadRoomRules from '../screens/Room/ReadRoomRules';
import Search from '../screens/Search/Search';
import Map from '../screens/Home/Map/Map';
import Notifications from '../screens/Account/Notifications';
import AccountSetting from '../screens/Account/AccountSetting';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const hiddenHeaderOptions = {headerShown: false};

  return (
    <Stack.Navigator initialRouteName="">
      {/* <Stack.Screen name='HomeScreen' component={Hotel} options={hiddenHeaderOptions}/> */}
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="MapScreen"
        component={Map}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="RoomCategoryScreen"
        component={RoomCategory}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="RoomCategoryAllScreen"
        component={RoomCategoryAll}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="RoomListScreen"
        component={RoomList}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="RoomListAllScreen"
        component={RoomListAll}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="ReservationFormScreen"
        component={ReservationForm}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="ReserveMethodScreen"
        component={ReserveMethod}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="ReserveConfirmScreen"
        component={ReserveConfirm}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="ReserveSuccessfulScreen"
        component={ReserveSuccessful}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="PaymentFormScreen"
        component={PaymentForm}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="PaymentCompleteScreen"
        component={PaymentComplete}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="CheckInDetailScreen"
        component={CheckInDetail}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="RefundFormScreen"
        component={RefundForm}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="RefundRequestCompleteScreen"
        component={RefundRequestComplete}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="BookingSuccessfulScreen"
        component={BookingSuccessful}
        options={hiddenHeaderOptions}
      />
      <Stack.Screen
        name="ReadRoomRulesScreen"
        component={ReadRoomRules}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="NotificationsScreen"
        component={Notifications}
        options={hiddenHeaderOptions}
      />

      <Stack.Screen
        name="AccountSettingScreen"
        component={AccountSetting}
        options={hiddenHeaderOptions}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
