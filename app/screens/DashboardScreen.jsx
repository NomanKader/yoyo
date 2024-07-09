import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
export default function DashboardScreen(){
    return(
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Text>Welcome to dashboard.</Text>
        <Icon name={'home'} size={40} color={'tomato'} />
        </View>
    )
}