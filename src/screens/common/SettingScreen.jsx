import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../context/ThemeContext";

export default function SettingScreen({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [currency, setCurrency] = useState("Dollar");
  const [country, setCountry] = useState("Thailand");
  const [language, setLanguage] = useState("Eng");

  useEffect(() => {
    const loadSettings = async () => {
      const savedCurrency = await AsyncStorage.getItem("currency");
      const savedCountry = await AsyncStorage.getItem("country");
      const savedLanguage = await AsyncStorage.getItem("language");

      if (savedCurrency) setCurrency(savedCurrency);
      if (savedCountry) setCountry(savedCountry);
      if (savedLanguage) setLanguage(savedLanguage);
    };
    loadSettings();
  }, []);

  const saveSetting = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            console.log("User logged out");
            navigation.replace("AuthStack");
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme === "dark" ? "#FFF" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme === "dark" && styles.darkText]}>
          Setting
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* General Settings */}
      <Text style={[styles.sectionTitle, theme === "dark" && styles.darkText]}>General</Text>
      <View style={styles.settingCard}>

        {/* Default Currency */}
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, theme === "dark" && styles.darkText]}>Default Currency</Text>
          <View style={styles.rightContainer}>            
            <Picker
              selectedValue={currency}
              onValueChange={(value) => {
                setCurrency(value);
                saveSetting("currency", value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Dollar" value="Dollar" />
              <Picker.Item label="Thai Baht" value="Thai Baht" />
            </Picker>
          </View>
        </TouchableOpacity>

        {/* Country */}
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, theme === "dark" && styles.darkText]}>Country</Text>
          <View style={styles.rightContainer}>            
            <Picker
              selectedValue={country}
              onValueChange={(value) => {
                setCountry(value);
                saveSetting("country", value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Thailand" value="Thailand" />
              <Picker.Item label="Myanmar" value="Myanmar" />
            </Picker>
          </View>
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, theme === "dark" && styles.darkText]}>Language</Text>
          <View style={styles.rightContainer}>            
            <Picker
              selectedValue={language}
              onValueChange={(value) => {
                setLanguage(value);
                saveSetting("language", value);
              }}
              style={styles.picker}
            >
              <Picker.Item label="English" value="Eng" />
              <Picker.Item label="Thai" value="Thai" />
            </Picker>
          </View>
        </TouchableOpacity>
      </View>

      {/* Application Settings */}
      {/* <Text style={[styles.sectionTitle, theme === "dark" && styles.darkText]}>Application settings</Text>
      <View style={styles.settingCard}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, theme === "dark" && styles.darkText]}>Notifications</Text>
          <Icon name="chevron-right" size={20} color="#A0A0A0" />
        </TouchableOpacity>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === "dark" && styles.darkText]}>Theme</Text>
          <View style={styles.rightContainer}>
            <Text style={[styles.selectedValue, theme === "dark" && styles.darkText]}>
              {theme === "dark" ? "Dark" : "Light"}
            </Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        </View>
      </View> */}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  darkContainer: {
    backgroundColor: "#222",
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
  darkText: {
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  settingCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedValue: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  picker: {
    width: 150,
  },
  logoutButton: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#DC3545",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#DC3545",
    fontWeight: "bold",
  },
});

