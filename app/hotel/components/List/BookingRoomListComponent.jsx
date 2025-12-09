import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../style/colors";
import { BASE_IMAGE_URL } from "../../../common/service/HttpService";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookingRoomListComponent = ({ item, navigation, checkInDate, checkOutDate,pricePerNight,categoryId }) => {
    console.log("item", item);

    // Get first photo safely
    const photoUri = item.roomPhotos?.length
        ? `${BASE_IMAGE_URL}${item.roomPhotos[0].photoName}`
        : null;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("AppStack", {
                    screen: "CreateReservationScreen",
                    params: {
                        title: item.roomCategoryName,
                        roomNo: item.roomNumber,
                        checkInDate,
                        checkOutDate,
                        id: item.id,
                        pricePerNight:pricePerNight,
                        status:item.status,
                        categoryId:categoryId
                    },
                })
            }
        >
            {photoUri ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: photoUri }} style={styles.image} />
                </View>
            ) : (
                <View style={[styles.imageContainer, { backgroundColor: "#ccc" }]} />
            )}


            <View style={styles.content}>
                <View style={styles.roomInfo}>
                    <Text style={styles.title}>
                        {item.roomNumber ? `Room ${item.roomNumber}` : ""}
                    </Text>
                </View>

            </View>
            <Ionicons name="chevron-forward" size={22} color="gray" style={styles.icon} />
        </TouchableOpacity>
    );
};

export default BookingRoomListComponent;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    imageContainer: {
        width: 57,          // width = height for circle
        height: 57,
        borderRadius: 27.5, // half of width/height
        overflow: 'hidden', // ensures image stays inside circle
        marginRight: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // make sure image fills container
    },

    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomInfo: {
        flex: 1,
        gap: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.colors.textDark,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginTop: 2,
    },
    icon: {
        position: "absolute",
        top: 17,
        right: 3,
    },
});
