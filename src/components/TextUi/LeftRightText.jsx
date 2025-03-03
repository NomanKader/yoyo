import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../../styles/colors';

const LeftRightText = ({
  label,
  value,
  labelColor = theme.colors.textDark, // Default label color
  valueColor = theme.colors.textDark, // Default value color
  labelBold = false,
  valueBold = true,
  labelNumberOfLines,
  valueNumberOfLines,
  fontSize = 16,
  mV = 10,
  maxWidth = '30%',
  justifyContent = 'space-between',
}) => {
  return (
    <View
      style={[
        styles.row,
        {marginVertical: mV, justifyContent: justifyContent},
      ]}>
      <Text
        style={[
          styles.label,
          {fontSize: fontSize},
          {maxWidth: maxWidth},
          {color: labelColor}, // Apply custom color
          labelBold ? {fontFamily: theme.customfonts.bold} : null,
        ]}
        numberOfLines={labelNumberOfLines} // Prevent wrapping
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          {fontSize: fontSize},
          {color: valueColor}, // Apply custom color
          valueBold ? {fontFamily: theme.customfonts.bold} : null,
        ]}
        numberOfLines={valueNumberOfLines}>
        {value}
      </Text>
    </View>
  );
};

export default LeftRightText;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items at the top when wrapping
  },
  label: {
    // fontSize: 16,
    fontFamily: theme.customfonts.regular,
    flexShrink: 0, // Do not allow shrinking
    // maxWidth: '30%', // Limit label to 30% of the row width
  },
  value: {
    // fontSize: 16,
    fontFamily: theme.customfonts.regular,
    flexShrink: 1, // Allow shrinking for value
    flexWrap: 'wrap', // Enable wrapping for value
    maxWidth: '70%', // Limit value width to 70% of the row width
    textAlign: 'right', // Align value to the right
  },
});