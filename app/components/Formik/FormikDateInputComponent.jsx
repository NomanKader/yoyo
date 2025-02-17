import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../style/colors';
import {CommonStyles} from '../../style/CommonStyles';

const FormikDateInputComponent = ({title, formikProps, formikKey}) => {
  const [show, setShow] = useState(false);

  const formatDate = date => {
    const fomattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(date.getDate()).padStart(2, '0')}`
      : date;
    return fomattedDate;
  };

  // Extract value and errors from Formik

  console.log(formikKey, formikProps.values[formikKey]);
  const error = formikProps.touched[formikKey] && formikProps.errors[formikKey];

  const onConfirm = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      // Format date as needed (YYYY-MM-DD)
      // const formattedDate = `${selectedDate.getFullYear()}-${String(
      //   selectedDate.getMonth() + 1,
      // ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

      // Update Formik field
      formikProps.setFieldValue(formikKey, selectedDate);
    }
  };

  return (
    <View>
      <Text style={CommonStyles.formLabel}>{title}</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.inputContainer}>
        <TextInput
          style={{color: theme.colors.textGray, height: 48}}
          placeholder="Select Date"
          value={formatDate(formikProps.values[formikKey]) || ''}
          editable={false} // Make the input non-editable
        />
        <Icon name="calendar-alt" size={25} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Show error message */}
      {show && (
        <DateTimePicker
          value={
            formikProps.values[formikKey]
              ? formikProps.values[formikKey]
              : new Date()
          }
          mode="date"
          display="default"
          onChange={onConfirm}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: theme.colors.inputBackgroundColor,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormikDateInputComponent;
