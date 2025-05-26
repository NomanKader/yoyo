import { useNavigation } from "@react-navigation/native"
import { View,Text } from "react-native"

export default function LocationInfoScreen() {
    const navigation=useNavigation();
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Location Info Screen</Text>
            <Text style={{ fontSize: 16, color: '#555' }}>This is where you can provide location information.</Text>
            {/* add proceed button */}
            <Text style={{ marginTop: 20, fontSize: 16, color: '#007bff' }} onPress={()=>navigation.navigate('DocumentUpload')}>Proceed to next step</Text>
        </View>
    )
}