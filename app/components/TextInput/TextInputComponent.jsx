import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this or use any icon library of your choice

const {width,height} = Dimensions.get('window')

const TextInputComponent = ({ label, placeholder, value, onChangeText, keyboardType, isSecure }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isSecure); // State to toggle password visibility

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#01070F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
  },
  input: {
    // flex: 1,
    width: width*0.65,
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    color: '#02000A',
    fontWeight: '500',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
});

export default TextInputComponent;
