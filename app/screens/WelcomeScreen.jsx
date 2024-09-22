import { ScrollView, Text, View } from "react-native";
import { CommonStyles } from "../style/CommonStyles";

export default function WelcomeScreen() {
    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            style={CommonStyles.scrollViewContainer}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Welcome to Customer App</Text>
            </View>
        </ScrollView>
    );
}
