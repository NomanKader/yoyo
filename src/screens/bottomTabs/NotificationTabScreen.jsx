import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Dummy Notification Data
const notifications = [
  {
    id: "1",
    title: "New Listing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet fringilla pulvinar purus convallis",
    date: "Today",
    iconColor: "#1E4DB7", // Blue
  },
  {
    id: "2",
    title: "New Listing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet fringilla pulvinar purus convallis",
    date: "Today",
    iconColor: "#229E46", // Green
  },
  {
    id: "3",
    title: "New Listing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet fringilla pulvinar purus convallis",
    date: "Yesterday",
    iconColor: "#229E46", // Green
  },
  
];

export default function NotificationTabScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Notification");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          {/* <Icon name="shuffle" size={24} color="#000" /> */}
          <Image source={require("../../assets/icons/arrowupdownIcon.png")} style={{width:30,height:30}} />
        </TouchableOpacity>
      </View>
      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {/* Show section headers for "Today" and "Yesterday" */}
            {index === 0 || notifications[index - 1].date !== item.date ? (
              <Text style={styles.sectionTitle}>{item.date}</Text>
            ) : null}

            <View style={styles.notificationItem}>
              <View
                style={[styles.iconCircle, { backgroundColor: item.iconColor }]}
              >
                <Icon name="bell" size={20} color="#FFF" />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTab: {
    color: "#000",
  },
  inactiveTab: {
    color: "#A0A0A0",
  },
  tabIndicator: {
    width: "25%",
    height: 2,
    backgroundColor: "#000",
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  notificationDescription: {
    fontSize: 12,
    color: "#555",
  },
});


