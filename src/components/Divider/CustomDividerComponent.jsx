import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../styles/colors"; // Keep your theme import

const CustomDividerComponent = ({
  text = "Or",
  textStyle = {},
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.line]} />
      <Text style={[styles.text,textStyle]}>{text}</Text>
      <View style={[styles.line]} />
    </View>
  );
};

export default CustomDividerComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: theme.colors.textGray,
  },
});
