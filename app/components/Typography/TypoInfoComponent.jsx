import React, { useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import TextInputComponent from '../TextInput/TextInputComponent';

const TypoInfoComponent = ({icon, label, backgroundColor = '#F5F5F5'}) => {    
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30, // Rounded corners
    backgroundColor: '#F5F5F5', // Default background color
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  icon: {
    width: 24, // Adjust icon size as needed
    height: 24,
    marginRight: 10, // Space between icon and text
  },
  label: {
    fontSize: 13, // Text size
    color: '#333', // Text color
  },
});

export default TypoInfoComponent;
