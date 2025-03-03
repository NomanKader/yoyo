// src/components/Formik/FormikRadioButton.js

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import theme from '../../styles/colors';
import RadioInActive from '../../assets/icons/radioInActive.svg';
import RadioActive from '../../assets/icons/radioActive.svg';

const FormikRadioButton = ({
  label,
  options,
  formikProps,
  formikKey,
  containerStyle,
  optionStyle,
}) => {
  const value = formikProps.values[formikKey];
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleLabel}>{label}</Text>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[styles.option, optionStyle]}
          onPress={() => formikProps.setFieldValue(formikKey, option.value)}>
          {/* <View
            style={[styles.radio, value === option.value && styles.selected]}>
            {value === option.value && <View style={styles.innerCircle} />}
          </View> */}
          {value === option.value ? (
            <RadioActive width={20} height={20} />
          ) : (
            <RadioInActive width={20} height={20} />
          )}
          {option.imageSource && (
            <Image source={option.imageSource} style={styles.itemImage} />
          )}
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleLabel: {
    fontSize: 16,
    marginBottom: 7,
    fontFamily: theme.customfonts.medium,
    color: theme.colors.textDark,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  option: {
    width: '100%',
    padding: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.medium,
    fontSize: 16,
    marginLeft: 12,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontFamily: theme.customfonts.regular,
  },
  itemImage: {
    borderRadius: 140,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});

export default FormikRadioButton;
