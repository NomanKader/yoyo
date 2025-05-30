import { max } from 'moment';
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import theme from '../../style/colors';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  contentContainerStyle,
  bgColor = '#fff',
  editable = true,
  mv = 0,
  maxLength,
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          {backgroundColor: bgColor,marginVertical:mv},
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textGray}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        maxLength={maxLength}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
