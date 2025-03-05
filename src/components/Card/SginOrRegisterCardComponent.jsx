import React from "react";
import {Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const SigninOrRegisterCardComponent = ({ iconName,title,iconColor,onPress,containerStyle }) => {
  return (
    <TouchableOpacity style={[styles.button,containerStyle]} onPress={onPress} activeOpacity={0.7}>
      <Icon name={iconName} size={20} color={iconColor} style={styles.icon} />

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SigninOrRegisterCardComponent;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
