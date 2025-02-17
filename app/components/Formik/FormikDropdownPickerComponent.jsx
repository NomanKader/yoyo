import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import theme from '../../style/colors';

const FormikDropdownPickerComponent = ({
  formikProps,
  formikKey,
  open,
  setOpen,
  items,
  setItems,
  placeholder,
  onValueChange,
  multiple = false,
  containerStyle = {zIndex: 5000},
}) => {
  const error = formikProps.touched[formikKey] && formikProps.errors[formikKey]; // Check for errors

  const onSelectChange = value => {
    formikProps.setFieldValue(formikKey, value); // Update Formik value
    if (onValueChange) {
      onValueChange(value); // Trigger optional callback
    }
  };

  console.log(formikKey, formikProps.values[formikKey]);

  return (
    <View
      style={[
        containerStyle,
        {
          borderWidth: 1,
          padding: 3,
          borderColor: '#ccc',
          backgroundColor: '#F1F1F1',
        },
      ]}>
      <RNPickerSelect
        onValueChange={onSelectChange}
        items={items} // Expecting an array of { label, value } objects
        value={formikProps.values[formikKey]} // Controlled value from Formik
        placeholder={
          formikProps.values[formikKey]
            ? {} // No placeholder if value exists
            : {label: placeholder, value: ''}
        }
        style={{
          inputIOS: styles.pickerStyleIOS,
          inputAndroid: styles.pickerStyleAndroid,
          placeholderStyle: styles.placeholderStyle,
          iconContainer: styles.iconContainer, // Positioning the icon
        }}
        dropdownItemStyle={styles.dropdownItemStyle}
        activeItemStyle={styles.activeItemStyle}
        useNativeAndroidPickerStyle={false}
      />
      {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={onSelectChange} // Update Formik on change
        setItems={setItems}
        multiple={multiple}
        placeholder={placeholder}
        style={styles.input}
        dropDownContainerStyle={styles.dropdown}
      /> */}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Show error message */}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyleIOS: {
    color: theme.colors.textDarkGray,
    paddingVertical: 12, // Vertical padding for centering
    height: 40, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
  },
  pickerStyleAndroid: {
    color: theme.colors.textDark,
    height: 45, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
    marginHorizontal: 0,
    paddingVertical: 0, // No extra vertical padding for Android
    paddingHorizontal: 0,
    paddingRight: 16,
    fontSize: 18,
  },
  placeholderStyle: {
    color: theme.colors.textLightGray,

    fontSize: 18,
  },
  iconContainer: {
    top: 10, // Adjust position vertically
    right: 10, // Position it towards the right
  },
  requiredAsterisk: {
    color: 'red',
    fontSize: 16,
  },
  dropdownItemStyle: {
    color: theme.colors.textDark,
    fontSize: 18,
  },
  activeItemStyle: {
    color: theme.colors.primary,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormikDropdownPickerComponent;
