import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../style/colors';

const RoundButtonComponent = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  button: {
    width: 136,
    height: 50,
    borderTopLeftRadius:30,
    borderBottomLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoundButtonComponent;
