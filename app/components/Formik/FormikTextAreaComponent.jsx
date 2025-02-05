import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function FormikTextAreaComponent({
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  backgroundColor = '#F5F5F5',
  borderRadius = 10,
  formikProps,
  formikKey,
}) {
  return (
    <View
      style={[
        styles.textAreaContainer,
        {backgroundColor, borderRadius},
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? styles.errorInput
          : null,
      ]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={numberOfLines}
        style={styles.textArea}
        textAlignVertical="top" // Align text to the top-left
      />
      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textAreaContainer: {
    padding: 10,
  },
  textArea: {
    height: 150, // You can adjust the height based on your preference
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
