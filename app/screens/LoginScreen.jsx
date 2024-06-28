import React from "react";
import { Button, View,StyleSheet } from "react-native";
export default function LoginScreen(){
    return(
        <View style={{}}>
            <Button title="Login" onPress={()=>handleLogin()}/>
        </View>
    )
}
const styles=StyleSheet.create(({
    loginBtn:{

    }
}))