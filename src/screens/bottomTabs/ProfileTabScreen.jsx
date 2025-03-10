import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

// Import icons
import profileIcon from "../../assets/icons/profileIcon.png";
import favouriteIcon from "../../assets/icons/favouriteIcon.png";
import transactionHistoryIcon from "../../assets/icons/transactionHistoryIcon.png";
import compareIcon from "../../assets/icons/compareIcon.png";
import faqIcon from "../../assets/icons/faqIcon.png";
import logoutIcon from "../../assets/icons/logoutIcon.png"; // Add a logout icon
import profileImage from "../../assets/images/profileImage.png"; // Replace with actual image

export default function ProfileTabScreen() {
  const navigation = useNavigation();

  // Logout function
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.clear(); // Clear storage
            console.log("User logged out");
            navigation.replace("AuthStack"); // Navigate to Login screen
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
      },
    ]);
  };

  return (    
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="settings" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>Allex Nail</Text>
        <Text style={styles.profileRole}>Buyer</Text>
      </View>

      {/* Menu List */}
      <ScrollView>
      <View style={styles.menuList}>
        <MenuItem icon={profileIcon} text="My Profile" />
        <MenuItem icon={favouriteIcon} text="Favorites" />
        <MenuItem icon={transactionHistoryIcon} text="Transaction History" />
        <MenuItem icon={compareIcon} text="Compare" />
        <MenuItem icon={faqIcon} text="FAQ" />
      </View>
      

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.menuItem}>
          <View style={[styles.menuIconContainer, { backgroundColor: "#fff1f2" }]}>
            <Image source={logoutIcon} style={styles.logoutIcon} />
          </View>
          <Text style={[styles.menuText, { color: "#DC3545" }]}>Logout</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Reusable Menu Item Component
const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconContainer}>
      <Image source={icon} style={styles.menuIcon} />
    </View>
    <Text style={styles.menuText}>{text}</Text>
    <Icon name="chevron-right" size={22} color="#A0A0A0" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileRole: {
    fontSize: 14,
    color: "#777",
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",    
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoutIcon:{
    width:25,
    height:25
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  }
});


