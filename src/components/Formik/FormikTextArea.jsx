// src/components/Formik/FormikTextArea.js

import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';

const FormikTextArea = ({
  label,
  labelColor = theme.colors.textDark,
  formikProps,
  formikKey,
  placeholder,
}) => {
  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];
  return (
    <View style={[CommonStyles.inputContainer, hasError && CommonStyles.error]}>
      {label && (
        <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.textArea,
          formikProps.touched[formikKey] && formikProps.errors[formikKey]
            ? styles.errorInput
            : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          hasError ? theme.colors.danger : theme.colors.formBorderColor
        }
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        value={formikProps.values[formikKey]}
        multiline
        numberOfLines={4}
      />
      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  textArea: {
    padding: 0,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top', // Aligns the text to the top
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.regular,
    fontSize: 18,
  },
  errorInput: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontFamily: theme.customfonts.regular,
  },
});

export default FormikTextArea;

// <FormikTextArea
//   label="Description"
//   formikProps={formikProps}
//   formikKey="description"
//   placeholder="Enter a description here"
// />
