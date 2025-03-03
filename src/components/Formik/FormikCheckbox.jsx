// src/components/Formik/FormikCheckbox.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const FormikCheckbox = ({label, formikProps, formikKey}) => {
  const value = formikProps.values[formikKey];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => formikProps.setFieldValue(formikKey, !value)}>
      <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: theme.colors.white,
  },
  label: {
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormikCheckbox;
