import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ExploreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* House Icon */}
      <Icon name="home-search-outline" size={80} color="#2E5BFF" style={styles.icon} />

      {/* Title */}
      <Text style={styles.title}>Explore properties on PropertyEase</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Discover your perfect home with our personalized property search
      </Text>

      {/* Continue Button */}
      <DefaultButtonComponent title={"Continue"} onPress={() => navigation.navigate("exploreStep")} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});


