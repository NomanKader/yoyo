import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListingDetailScreen from "../screens/Apartment/ListingDetailScreen";
export default function ApartmentAppStack() {
    const Stack=createNativeStackNavigator();
    const hiddenHeaderOptions = {headerShown: false};
    return (
        <Stack.Navigator initialRouteName="">
          {/* <Stack.Screen name='HomeScreen' component={Hotel} options={hiddenHeaderOptions}/> */}
          <Stack.Screen
            name="ListingDetail"
            component={ListingDetailScreen}
            options={hiddenHeaderOptions}
          />         
        </Stack.Navigator>
      );
}   