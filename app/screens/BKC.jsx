import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import backIcon from '../assets/icons/backIcon.png';
import BookingSkeletonComponent from "../components/Skeleton/BookingSkeletonComponent";
import CauroselComponent from "../components/Caurosel/CauroselComponent";
import GetBookingAPI from "../services/BookingService";
import CarouselSkeletonComponent from "../components/Skeleton/CauroselSkeletonComponent";
import { CommonStyles } from "../style/CommonStyles";
import DividerComponent from "../components/Divider/DividerComponent";
import BookingListComponent from "../components/List/BookingListComponent";
import RoomService from "../services/RoomService";
export default function BookingScreen() {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [roomCategory, setRoomCategory] = useState([]);

    useEffect(() => {
        GetBookingAPI(setData);
        RoomService.GetRoomCategory(setRoomCategory);
    }, []);

    return (
        <View style={CommonStyles.scrollViewContainer}>
            <Image source={backIcon} alt='backIcon' style={CommonStyles.appBarIcon} />
            {data.length === 0 ?
                <View>
                    <BookingSkeletonComponent />
                </View> :
                showLoading ?
                    <CarouselSkeletonComponent /> :
                    <>
                        <View style={styles.headerView}>
                            <CauroselComponent data={data} setShowLoading={setShowLoading} />
                            <Text style={CommonStyles.header}>A Hotels</Text>
                            <Text style={CommonStyles.subHeader}>No.120, Baho Road, Hlaing, Yangon</Text>
                        </View>
                        <View style={CommonStyles.dividerView}>
                            <DividerComponent />
                        </View>
                        <View style={CommonStyles.textContainer}>
                            <Text style={CommonStyles.text}>Room Categories</Text>
                            <Text style={CommonStyles.seeAll}>See all</Text>
                        </View>
                        <BookingListComponent data={roomCategory} />
                    </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerView: {
        // margin:20
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 18,
        marginTop: 5
    }
});
