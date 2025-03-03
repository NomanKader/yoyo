import React from 'react';
import { View, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import theme from '../../styles/colors';
import { CommonStyles } from '../../styles/CommonStyles';

export default function CheckBoxComponent({
  label,
  isChecked,
  onToggle,
  isSwap,
}) {
  return (
    <View style={[CommonStyles.infoContainer, { flexDirection: 'row', alignItems: 'center' }]}>
      {isSwap ? (
        <>
          <CheckBox
            isChecked={isChecked}
            onClick={onToggle}
            checkBoxColor={theme.colors.success}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            {label}
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            {label}
          </View>
          <CheckBox
            isChecked={isChecked}
            onClick={onToggle}
            checkBoxColor={theme.colors.success}
          />
        </>
      )}
    </View>
  );
}
