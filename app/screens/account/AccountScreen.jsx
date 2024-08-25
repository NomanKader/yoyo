import React from "react";
import { Alert, Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { CommonStyles } from "../../style/CommonStyles";
import DetailAppBarComponent from "../../components/AppBar/DetailAppBarComponent";
import profileImage from '../../assets/icons/profileImage.png';
import DividerComponent from "../../components/Divider/DividerComponent";
import AccountSettingListComponent from "../../components/List/AccountSettingListComponent";
import profileIcon from '../../assets/icons/profileIcon.png';
import walletIcon from '../../assets/icons/walletIcon.png';
import historyIcon from '../../assets/icons/historyIcon.png';
import categoryIcon from '../../assets/icons/categoryIcon.png';
import roomIcon from '../../assets/icons/roomIcon.png';
import bookingCancelIcon from '../../assets/icons/bookingCancelIcon.png';
import languageSettingIcon from '../../assets/icons/languageSettingIcon.png';
import requestFacilityIcon from '../../assets/icons/requestFacilityIcon.png';
import addOnPriceFeatureIcon from '../../assets/icons/addOnPriceFeatureIcon.png';
import manageDiscountIcon from '../../assets/icons/manageDiscountIcon.png';
import logoutIcon from '../../assets/icons/logoutIcon.png';
import AccessTokenService from "../../helper/AccessTokenService";

export default function AccountScreen({ navigation }) {
    // List of account settings
    const accountSettings = [
        { icon: profileIcon, header: "Profile Settings", subheader: "Edit your profile", navigateTo: { name: 'AppStack', params: { screen: 'ProfileScreen' } } },
        { icon: walletIcon, header: "Wallet", subheader: "Manage your wallet", navigateTo: { name: 'AppStack', params: { screen: 'WalletScreen' } } },
        { icon: historyIcon, header: "History", subheader: "View your history", navigateTo: { name: 'AppStack', params: { screen: 'HistoryScreen' } } },
        { icon: categoryIcon, header: "Manage Categories", subheader: "Manage your categories", navigateTo: { name: 'AppStack', params: { screen: 'ManageCategoriesScreen' } } },
        { icon: roomIcon, header: "Manage Rooms", subheader: "Manage your rooms", navigateTo: { name: 'AppStack', params: { screen: 'ManageRoomsScreen' } } },
        { icon: bookingCancelIcon, header: "Booking Cancel Setting", subheader: "Set booking cancellation policies", navigateTo: { name: 'AppStack', params: { screen: 'BookingCancelSettingScreen' } } },
        { icon: languageSettingIcon, header: "Language Setting", subheader: "Set app language", navigateTo: { name: 'AppStack', params: { screen: 'LanguageSettingScreen' } } },
        { icon: requestFacilityIcon, header: "Request Facility", subheader: "Request additional facilities", navigateTo: { name: 'AppStack', params: { screen: 'FacilitySettingScreen' } } },
        { icon: addOnPriceFeatureIcon, header: "Add-on Price Features", subheader: "Manage add-on prices", navigateTo: { name: 'AppStack', params: { screen: 'AddOnPriceFeaturesScreen' } } },
        { icon: manageDiscountIcon, header: "Manage Discount", subheader: "Set discounts", navigateTo: { name: 'AppStack', params: { screen: 'ManageDiscountScreen' } } },
        { icon: logoutIcon, header: "Logout", subheader: "Sign out of your account", navigateTo: "Logout" }
    ];

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Header and Profile Section */}
            <View style={CommonStyles.scrollViewContainer}>
                <DetailAppBarComponent
                    title={"Account"}
                    onMorePress={() => Alert.alert("Coming Soon")}
                    navigation={navigation}
                    hideBackIcon={true}
                />
                <DividerComponent />
                <View style={styles.profileContainer}>
                    <Image source={profileImage} style={styles.profileImage} />
                    <Text style={CommonStyles.header}>Hotel Admin</Text>
                    <Text style={CommonStyles.subHeader}>ahotel@gmail.com</Text>
                </View>
                <DividerComponent />
            </View>

            {/* Account Settings List Section */}
            <View style={styles.settingsListContainer}>
                {accountSettings.map((setting, index) => (
                    <AccountSettingListComponent
                        key={index}
                        icon={setting.icon}
                        header={setting.header}
                        subheader={setting.subheader}
                        onPress={() => {
                            if (setting.navigateTo === "Logout") {
                                Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Logout", onPress: () => [AccessTokenService._ClearKeyChainData(),navigation.navigate('AuthStack',{screen:'LoginScreen'})] },
                                ]);
                            } else {
                                navigation.navigate(setting.navigateTo);
                            }
                        }}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    settingsListContainer: {
        // paddingHorizontal: 16, // Add some padding if needed
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    subheaderText: {
        fontSize: 16,
        color: '#666',
    },
});
