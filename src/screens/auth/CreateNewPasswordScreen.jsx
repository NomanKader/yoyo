import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CreateNewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [validCase, setValidCase] = useState(false);

  const validatePassword = (value) => {
    setPassword(value);
    setValidLength(value.length >= 8);
    setValidCase(/[a-z]/.test(value) && /[A-Z]/.test(value));
  };

  const handleContinue = () => {
    if (password === confirmPassword && validLength && validCase) {
      console.log("Password changed successfully!");
      navigation.navigate("NextScreen"); // Navigate after successful validation
    } else {
      alert("Please ensure passwords match and meet the requirements.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new password</Text>
      <Text style={styles.subtitle}>Welcome back! Please enter your details</Text>

      <TextInput
        style={styles.input}
        placeholder="Create new password"
        secureTextEntry
        onChangeText={validatePassword}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      {/* Password Validation Checks */}
      <View style={styles.validationContainer}>
        <Text style={styles.validationTitle}>Password must have :</Text>
        <View style={styles.validationItem}>
          <Icon name={validLength ? "check-circle" : "cancel"} size={18} color={validLength ? "green" : "red"} />
          <Text style={styles.validationText}> Password must have at least 8 characters.</Text>
        </View>
        <View style={styles.validationItem}>
          <Icon name={validCase ? "check-circle" : "cancel"} size={18} color={validCase ? "green" : "red"} />
          <Text style={styles.validationText}> Combination of Upper and Lowercase Letters</Text>
        </View>
      </View>

      {/* Continue Button */}
      <DefaultButtonComponent title={"Continue"} onPress={handleContinue} disabled={!validLength || !validCase || password !== confirmPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCCCCC",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  validationContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  validationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  validationText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
});
