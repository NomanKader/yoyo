// import Screens
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../screens/explore/ExploreScreen";
import ExploreStepScreen from "../screens/explore/ExploreStepScreen";
export default function AppStack(){
    const Stack=createStackNavigator();
    const hiddenOptions={
        headerShown:false
    }
    return(
        <Stack.Navigator>
            <Stack.Screen name="explore" component={ExploreScreen} options={hiddenOptions} />
            <Stack.Screen name="exploreStep" component={ExploreStepScreen} options={hiddenOptions} />
        </Stack.Navigator>
    )
}