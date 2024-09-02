import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';

const DefaultButtonComponent = ({ title, backgroundColor, onPress,color }) => {
  return (
    <TouchableOpacity
      style={[CommonStyles.defaultButton, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >          
      <Text
  style={[
    CommonStyles.defaultButtonText,
    color && { color: color }
  ]}
>
  {title}
</Text>
    </TouchableOpacity>
  );
};



export default DefaultButtonComponent;
