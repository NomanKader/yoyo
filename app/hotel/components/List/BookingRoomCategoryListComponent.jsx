import React from "react"
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import theme from "../../style/colors";
import { BASE_IMAGE_URL } from "../../../common/service/HttpService";
import Ionicons from "react-native-vector-icons/Ionicons"; // <-- add this


const BookingRoomCategoryListComponent = ({ item, navigation, checkInDate, checkOutDate }) => {
    console.log("fefefe",item)

    const handlePress = () => {
        if (!checkInDate || !checkOutDate) {
            Alert.alert(
                "Missing Dates",
                "Please select both check-in and check-out dates before continuing."
            );
            return;
        }

        navigation.navigate("AppStack", {
            screen: "BookingRoomListScreen",
            params: {
                title: item?.description,
                checkInDate,
                checkOutDate,
                id: item.id,
                pricePerNight:item.pricePerNight
            }
        });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image
                source={{ uri: `${BASE_IMAGE_URL}${item?.roomCategoryPhotos[0]}` }}
                style={styles.image} />
            <View style={styles.content}>
                <View style={styles.roomInfo}>
                    <Text style={styles.title}>
                        {item.description}
                    </Text>
                    <Text style={styles.subtitle}>
                        {`${item?.pricePerNight?.toLocaleString()} Ks`}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="gray" style={styles.icon} />
            </View>
        </TouchableOpacity>
    )

}
export default BookingRoomCategoryListComponent
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    image: {
        width: 65,
        height: 55,
        borderRadius: 5,
        marginRight: 12,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomInfo: {
        flex: 1,
        gap: 5
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
    statusWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderColor: '#E4E4E4',
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    statusText: {
        fontSize: 13,
        fontWeight: '500',
    },
    icon: {
        position: "absolute",
        top: 0,
        right: 0,
    },
})