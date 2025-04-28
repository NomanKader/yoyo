import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Feather"; // Using Feather icons


export default function SettingTabScreen({ navigation }) {
  const { t } = useTranslation();

  const settingOptions = [
    {
      id: 1,
      icon: "user",
      label: t("setting.myProfile"),
      backgroundColor: "#FFECEC",
      onPress: () => navigation.navigate("EditProfileScreen"), 
    },
    {
      id: 2,
      icon: "grid",
      label: t("setting.propertyDashboard"),
      backgroundColor: "#EEF3FF",
      onPress: () => navigation.navigate("PropertyDashboardScreen"),
    },
    {
      id: 3,
      icon: "file-text",
      label: t("setting.transactionHistory"),
      backgroundColor: "#ECFAEF",
      onPress: () => navigation.navigate("TransactionHistoryScreen"),
    },
    {
      id: 4,
      icon: "help-circle",
      label: t("setting.faq"),
      backgroundColor: "#F5F5F5",
      onPress: () => navigation.navigate("FAQScreen"),
    },
    {
      id: 5,
      icon: "settings",
      label: t("settings"),
      backgroundColor: "#F5F5F5",
      onPress: () => navigation.navigate('SettingScreen')
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{uri:'https://randomuser.me/api/portraits/men/32.jpg'}} style={styles.profileImage} />
        <Text style={styles.profileName}>William</Text>
        <Text style={styles.profileRole}>Landlord</Text>
      </View>

      {/* Options List */}
      {settingOptions.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.optionRow}
          onPress={item.onPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
            <Icon name={item.icon} size={20} color="#000" />
          </View>
          <Text style={styles.optionLabel}>{item.label}</Text>
          <Icon name="chevron-right" size={20} color="#C4C4C4" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex:1
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  profileRole: {
    fontSize: 14,
    color: "#777",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
