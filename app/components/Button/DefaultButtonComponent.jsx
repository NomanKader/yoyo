import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CommonStyles } from '../../style/CommonStyles';
import theme from '../../style/colors';

const DefaultButtonComponent = ({ title, backgroundColor, onPress, color, disable }) => {
  return (
    <TouchableOpacity
      style={[
        CommonStyles.defaultButton,
        { backgroundColor: disable ? theme.colors.disabled : backgroundColor }, // Change color if disabled
        disable && { opacity: 0.6 } // Add opacity if disabled
      ]}
      onPress={!disable ? onPress : null} // Disable onPress when `disable` is true
      disabled={disable} // Disable the button
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
