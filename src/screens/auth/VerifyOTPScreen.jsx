import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import DefaultButtonComponent from "../../components/Button/DefaultButtonComponent";

export default function VerifyOTPScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60); // Countdown timer
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next field when typing
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && otp[index] === "") {
      let newOtp = [...otp];

      // Move focus to previous field if deleting an empty field
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }

      // Remove the last entered digit
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleResend = () => {
    setTimer(60); // Reset timer
    setOtp(["", "", "", "", ""]); // Clear OTP fields
  };

  const handleContinue = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    if (enteredOtp.length === 5) {
      // Add OTP verification logic here
      navigation.navigate("createNewPassword"); // Navigate after successful verification
    } else {
      alert("Please enter a valid 5-digit OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to your email to complete the account verification
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOTPChange(index, value)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          />
        ))}
      </View>

      <Text style={styles.infoText}>A code has been sent to your email.</Text>

      {timer > 0 ? (
        <Text style={styles.resendText}>Resend in 00:{timer < 10 ? `0${timer}` : timer}</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={[styles.resendText, { color: "#007BFF" }]}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <DefaultButtonComponent title={"Continue"} onPress={handleContinue} />
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCCCCC",
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 20,
  },
});

