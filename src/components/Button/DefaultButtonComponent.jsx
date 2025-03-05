// src/components/Button/DefaultButtonComponent.jsx

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';

const DefaultButtonComponent = ({
  title,
  backgroundColor = theme.colors.primary,
  onPress,
  color = theme.colors.textLight,
  buttonStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        CommonStyles.defaultButton,
        {backgroundColor: disabled ? '#EAEAEA' : backgroundColor},
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          CommonStyles.defaultButtonText,
          {color: disabled ? '#000' : color},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DefaultButtonComponent;
