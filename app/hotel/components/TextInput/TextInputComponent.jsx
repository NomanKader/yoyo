import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have this or use another icon library

const TextInputComponent = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  isSecure,
  error,
  helperText,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isSecure); // State to toggle password visibility

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        <TextInput
          keyboardType={keyboardType}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.textInputColor}
          autoCapitalize="none"
          secureTextEntry={isSecure && !isPasswordVisible} // Only set secureTextEntry if isSecure is true
        />
        {isSecure && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={theme.colors.textInputColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Show helper text or error message */}
      {helperText && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#01070F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
  },
  input: {
    flex: 1, // Ensure the input takes up all available space
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    color: '#02000A',
    fontWeight: '500',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  errorBorder: {
    borderColor: '#FF4D4F', // Red border for error state
  },
  helperText: {
    marginTop: 5,
    fontSize: 12,
    color: '#8C8C8C', // Default gray helper text
  },
  errorText: {
    color: '#FF4D4F', // Red for error message
  },
});

export default TextInputComponent;
