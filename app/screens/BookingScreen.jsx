import React from "react";
import { Text, View } from "react-native";
import BookingSkeletonComponent from "../components/Skeleton/BookingSkeletonComponent";
export default function BookingScreen(){
    return(
        <View>
            <BookingSkeletonComponent/>
        </View>
    )
}