// src/components/Button/DefaultButtonComponent.jsx

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';

const DefaultButtonOutline = ({
  title,
  borderColor = theme.colors.primary,
  onPress,
  color = theme.colors.primary,
  buttonStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        CommonStyles.defaultButtonOutline,
        {borderColor: disabled ? theme.colors.textLightGray : borderColor},
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          CommonStyles.defaultButtonOutlineText,
          {color: disabled ? theme.colors.textLightGray : color},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DefaultButtonOutline;
