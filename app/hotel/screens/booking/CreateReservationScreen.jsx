import { StyleSheet, Text, View, ScrollView, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import DividerComponent from "../../components/Divider/DividerComponent";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import { useMemo, useState } from "react";
import TextInputWithDropdown from "../../../apartment/components/Dropdown/TextInputWithDropdown";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import theme from "../../style/colors";
import { CreateBooking } from "../../services/BookingService";

const CreateReservationScreen = ({ route, navigation }) => {
    const {
        title,
        roomNo,
        checkInDate,
        checkOutDate,
        pricePerNight,
        id,
        categoryId,
        status
    } = route.params || {};

    // State
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+95");
    const [numAdults, setNumAdults] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    const [extraBed, setExtraBed] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const countryCodes = [
        { label: "+95", value: "+95" },
        { label: "+66", value: "+66" },
    ];

    // Calculate nights
    const nights = Math.max(
        1,
        Math.round(
            (Date.UTC(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate()) -
                Date.UTC(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate())) /
            (1000 * 60 * 60 * 24)
        )
    );

    const totalPrice = nights * pricePerNight;

    // Helpers
    const formatDateForDisplay = (date) =>
        `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;

    const formatMMK = (value) =>
        `${value.toLocaleString("en-US")} MMK`;

    const lengthOfStayLabel = `${nights} ${nights > 1 ? "Days" : "Day"}`;

    const handleConfirmPress = () => {
        if (!fullName.trim()) {
            Alert.alert("Missing Info", "Please enter your full name.");
            return;
        }
        if (!phoneNumber.trim()) {
            Alert.alert("Missing Info", "Please enter your phone number.");
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirm = async () => {
        const postBody = {
            roomCategoryId: categoryId,
            roomId: id,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(), 
            guestName: fullName,
            guestEmail: email,
            phone: phoneNumber,
            adults: numAdults,
            children: numChildren,
            status: status,
            extraBed: extraBed
        };

        console.log("postBody", postBody);

        try {
            const respone = await CreateBooking(1, postBody);
            console.log(JSON.stringify(respone));

            if (respone.success) {
                navigation.navigate("SuccessScreen", {
                    header: "Reservation Successful!",
                    subheader: "Your room has been booked successfully.",
                    nextScreen: "TabScreen",
                    nextScreenParams: {},
                    icon: null,
                    isShowingIllustration: true,
                    buttonText: "Back to home",
                    color: theme.colors.primary,
                });
            } else {
                Alert.alert("Info", respone?.message || "Failed to create reservation.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setShowConfirmModal(false);
        }
    };
    const isEmailValid = email.trim() === "" || /\S+@\S+\.\S+/.test(email.trim());


    const isFormValid = useMemo(
        () =>
            fullName.trim().length > 0 &&
            phoneNumber.trim().length > 0 &&
            isEmailValid,
        [fullName, phoneNumber, numAdults, numChildren, extraBed, isEmailValid]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginHorizontal: 16 }}>
                <DetailAppBarComponent title="Create Reservation" navigation={navigation} />
            </View>

            <DividerComponent />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentBox}>
                    {/* Dates row */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Check in Date</Text>
                            <Text style={styles.infoValue}>{formatDateForDisplay(checkInDate)}</Text>
                        </View>

                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Check out Date</Text>
                            <Text style={styles.infoValue}>{formatDateForDisplay(checkOutDate)}</Text>
                        </View>
                    </View>

                    {/* Room Category */}
                    <View style={styles.block}>
                        <Text style={styles.sectionLabel}>Room Category</Text>
                        <Text style={styles.sectionValue}>{title}</Text>
                    </View>

                    {/* Room Number + Price */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Room Number</Text>
                            <Text style={styles.infoValue}>{roomNo}</Text>
                        </View>
                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Room Price</Text>
                            <Text style={styles.infoValue}>{formatMMK(pricePerNight)}</Text>
                        </View>
                    </View>

                    {/* Length of stay + Total amount */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Length of Stay</Text>
                            <Text style={styles.infoValue}>{lengthOfStayLabel}</Text>
                        </View>
                        <View style={styles.infoCol}>
                            <Text style={styles.infoLabel}>Total Amount</Text>
                            <Text style={[styles.infoValue, { color: theme.colors.primary }]}>
                                {formatMMK(totalPrice)}
                            </Text>
                        </View>
                    </View>

                    {/* Form fields */}
                    <TextInputComponent
                        placeholder="Enter your full name"
                        label="Customer Name"
                        value={fullName}
                        onChangeText={setFullName}
                    />

                    <TextInputWithDropdown
                        label="Phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        dropdownValue={countryCode}
                        placeholder='Enter your phone number'
                        setDropdownValue={setCountryCode}
                        dropdownData={countryCodes}
                        position="front"
                        bgColor="#f2f2f2"
                    />

                    <TextInputComponent
                        placeholder="Enter your email"
                        label="Email address ( Optional )"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInputComponent
                        placeholder="Number of Adults"
                        label="Adults"
                        value={numAdults.toString()}
                        onChangeText={(text) => setNumAdults(Number(text))}
                        keyboardType="numeric"
                    />

                    <TextInputComponent
                        placeholder="Number of Children"
                        label="Children"
                        value={numChildren.toString()}
                        onChangeText={(text) => setNumChildren(Number(text))}
                        keyboardType="numeric"
                    />

                    <TextInputComponent
                        placeholder="Extra Bed"
                        label="Extra Bed"
                        value={extraBed.toString()}
                        onChangeText={(text) => setExtraBed(Number(text))}
                        keyboardType="numeric"
                    />

                </View>
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
                <DefaultButtonComponent
                    title="Confirm Reservation"
                    backgroundColor={theme.colors.primary}
                    onPress={handleConfirmPress}
                    disable={!isFormValid}
                />
            </View>

            {/* Confirm modal */}
            {showConfirmModal && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to confirm this reservation?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                                onPress={handleConfirm}
                            >
                                <Text style={styles.modalButtonText}>Yes, Confirm</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                                onPress={() => setShowConfirmModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default CreateReservationScreen;

// -------------------------
// STYLES
// -------------------------
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContent: { paddingBottom: 40 },
    contentBox: { padding: 20, gap: 20 },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    infoCol: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: "#777",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#01070F",
    },

    block: {
        marginTop: 8,
        marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 13,
        color: "#01070F",
        marginBottom: 4,
    },
    sectionValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#01070F",
    },

    bottomButtonContainer: {
        padding: 16,
        backgroundColor: "#fff",
    },

    // Modal Styles
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    modalMessage: { fontSize: 16, textAlign: "center", marginBottom: 20 },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});
