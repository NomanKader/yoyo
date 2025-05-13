import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PropertyCardComponent({ item }) {
  return (
    <View style={styles.propertyCard}>
      <Image source={item.image} style={styles.propertyImage} />

      <View style={styles.propertyContent}>
        <Text style={styles.propertyName}>{item.name}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <Text style={styles.propertyPrice}>{item.price}</Text>

        <View style={styles.propertyDetails}>
          <Text style={styles.propertyDetailText}>{item.type}</Text>
          <Text style={styles.propertyDetailText}>• {item.beds}</Text>
          <Text style={styles.propertyDetailText}>• {item.baths}</Text>
        </View>

        <View style={styles.statusRow}>
          <Text
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === "Available" ? "#ECFAEF" : "#F5F5F5",
                color: item.status === "Available" ? "#28a745" : "#A0A0A0",
              },
            ]}
          >
            {item.status}
          </Text>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Listing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  propertyCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 15,
    overflow: "hidden",
    elevation:2
  },
  propertyImage: {
    width: 120,
    height: "100%",
  },
  propertyContent: {
    flex: 1,
    padding: 10,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  propertyLocation: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyDetails: {
    flexDirection: "row",
    marginBottom: 8,
  },
  propertyDetailText: {
    fontSize: 12,
    color: "#555",
    marginRight: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusBadge: {
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: "#0047AB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "600",
  },
});
