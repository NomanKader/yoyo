import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';

const DefaultButtonComponent = ({ title, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[CommonStyles.defaultButton, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={CommonStyles.defaultButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};



export default DefaultButtonComponent;
