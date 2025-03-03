import React from 'react';
import {View, Text} from 'react-native';
import CheckBox from 'react-native-check-box';

export default function CustomCheckBox({
  label,
  isChecked,
  onToggle,
  isSwap,
  infoContainerStyle,
  checkBoxColor,
  unCheckedColor,
}) {
  return (
    <View
      style={[        
        {flexDirection: 'row', alignItems: 'center'},
        infoContainerStyle,
      ]}>
      {isSwap ? (
        <>
          <CheckBox
            isChecked={isChecked}
            onClick={onToggle}
            checkBoxColor={isChecked ? checkBoxColor : unCheckedColor || checkBoxColor}
            />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            {label}
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            {label}
          </View>
          <CheckBox
            isChecked={isChecked}
            onClick={onToggle}
            checkBoxColor={checkBoxColor}
          />
        </>
      )}
    </View>
  );
}
