import React from 'react';
import { View, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';

export default function CheckBoxComponent({ label, isChecked, onToggle }) {
  return (
    <View style={CommonStyles.infoContainer}>
      <Text style={CommonStyles.infoLabel}>{label}</Text>
      <CheckBox
        isChecked={isChecked}
        onClick={onToggle}
        checkBoxColor={theme.colors.primary}
      />
    </View>
  );
}

