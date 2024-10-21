import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity } from 'react-native';
import theme from '../../style/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this or use any icon library of your choice
import PaymentIcon from '../../assets/images/paymentIcon.png'

const TextIconInputComponent = ({ label, placeholder, value, onChangeText, keyboardType }) => {
  

  return (
    
    <View style={styles.container}>
        
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <Image source={PaymentIcon} style={styles.img} />
        <TextInput
          keyboardType={keyboardType}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.textInputColor}
          autoCapitalize="none"
          
        />
        
      </View>
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
    // justifyContent:'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    color: '#02000A',
    fontWeight: '500',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  img : {
    width:60,
    height:30,
    marginRight:15
  }
});

export default TextIconInputComponent;
