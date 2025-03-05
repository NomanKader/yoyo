import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';

const FormikTextInput = ({
  label,
  labelColor = theme.colors.textDark,
  formikProps,
  formikKey,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  onValueChange,
  required = false, // New prop for indicating required fields
  editable=true
}) => {
  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];

  const onTextChange = value => {
    formikProps.setFieldValue(formikKey, value);
    if (onValueChange) {
      onValueChange(value)
    }
  };

  return (
    <View style={[CommonStyles.inputContainer, hasError && CommonStyles.error,{backgroundColor:editable?theme.colors.textLight:theme.colors.titleBackgroundColor}]}>
      {label && (
        <Text style={[CommonStyles.formLabel, {color: labelColor}]}>
          {label}
          {required && <Text style={styles.asterisk}> *</Text>} {/* Asterisk for required fields */}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
        editable={editable}         
          style={[
            CommonStyles.formInput,
            hasError && styles.errorInput, // Apply red border only when there's an error            
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            hasError ? theme.colors.danger : theme.colors.formBorderColor
          }
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onChangeText={onTextChange}
          onBlur={formikProps.handleBlur(formikKey)}
          value={formikProps.values[formikKey] || ''} // Ensure value is always a string
        />
      </View>
      {/* {hasError && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: 'center',
    position: 'relative',
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
  asterisk: {
    color: theme.colors.danger,
  },
});

export default FormikTextInput;
