import React from "react";
import { View, StyleSheet } from "react-native";

export default function CardSkeletonComponent() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholderSmall} />
        <View style={styles.textPlaceholderSmall} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 15,
    overflow: "hidden",
    padding: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
  },
  textPlaceholder: {
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 5,
  },
  textPlaceholderSmall: {
    height: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    width: "60%",
  },
});
