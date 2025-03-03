// src/components/Formik/FormikSwitch.js

import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const FormikSwitch = ({label, formikProps, formikKey}) => {
  const value = formikProps.values[formikKey];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={newValue =>
          formikProps.setFieldValue(formikKey, newValue)
        }
      />
      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
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

export default FormikSwitch;
