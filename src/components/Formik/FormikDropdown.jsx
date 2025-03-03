import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {CommonStyles} from '../../styles/CommonStyles';
import theme from '../../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const FormikDropdown = ({
  inputContainerStyle,
  label,
  formikProps,
  formikKey,
  options = [],
  placeholder = 'Select...', // Default placeholder
  onValueChange,
  required = false, // Add required parameter
  disabled = false, // Add disabled parameter
}) => {
  const hasError =
    formikProps.touched[formikKey] && formikProps.errors[formikKey];

  const onSelectChange = value => {
    formikProps.setFieldValue(formikKey, value); // Update Formik value
    if (onValueChange) {
      onValueChange(value); // Trigger optional callback
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          CommonStyles.inputContainer,
          inputContainerStyle,
          hasError && CommonStyles.error,
        ]}>
        {label && (
          <Text style={CommonStyles.formLabel}>
            {label} {required && <Text style={styles.requiredAsterisk}>*</Text>}
          </Text>
        )}
        <RNPickerSelect
          onValueChange={onSelectChange} // Handle value change
          items={options} // Expecting an array of { label, value } objects
          value={formikProps.values[formikKey]} // Controlled value from Formik
          placeholder={{
            label: placeholder,
            value: '',
          }}
          style={{
            inputIOS: styles.pickerStyleIOS,
            inputAndroid: styles.pickerStyleAndroid,
            placeholderStyle: styles.placeholderStyle,
            iconContainer: styles.iconContainer, // Positioning the icon
          }}
          dropdownItemStyle={styles.dropdownItemStyle}
          activeItemStyle={styles.activeItemStyle}
          useNativeAndroidPickerStyle={false}
          {...(Platform.OS === 'ios' && {
            Icon: () => (
              <Ionicons
                name="chevron-down"
                size={20}
                color={theme.colors.textDarkGray}
                style={{marginTop: 7, marginRight: -5}}
              />
            ),
          })}
          {...(Platform.OS === 'android' && {
            Icon: () => (
              <Ionicons
                name="chevron-down"
                size={20}
                color={theme.colors.textDarkGray}
                style={{marginTop: 7, marginRight: -5}}
              />
            ),
          })}
          disabled={disabled}
        />
      </View>
      {/* Display error message */}
      {/* {hasError && (
        <Text style={CommonStyles.errorText}>
          {formikProps.errors[formikKey]}
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginBottom: 16,
  },
  pickerStyleIOS: {
    fontFamily: theme.customfonts.regular,
    color: theme.colors.textDarkGray,
    paddingVertical: 12, // Vertical padding for centering
    height: 40, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
  },
  pickerStyleAndroid: {
    fontFamily: theme.customfonts.regular,
    color: theme.colors.textDark,
    height: 58, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
    marginHorizontal: 0,
    paddingVertical: 0, // No extra vertical padding for Android
    paddingHorizontal: 0,
    paddingRight: 16,
    fontSize: 18,
  },
  placeholderStyle: {
    color: theme.colors.textLightGray,
    fontFamily: theme.customfonts.regular,
    fontSize: 18,
  },
  iconContainer: {
    top: 10, // Adjust position vertically
    right: 10, // Position it towards the right
  },
  requiredAsterisk: {
    color: theme.colors.danger,
    fontSize: 16,
  },
  dropdownItemStyle: {
    fontFamily: theme.customfonts.regular,
    color: theme.colors.textDark,
    fontSize: 18,
  },
  activeItemStyle: {
    color: theme.colors.primary,
  },
});

export default FormikDropdown;
