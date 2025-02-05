import React, {useState} from 'react';
import {
  View,
  Button,
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

const FormikDateInputComponent = ({
  title,
  value,
  valueChange,
  formikProps,
  formikKey,
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  // const [formattedDate, setFormattedDate] = useState('');

  const onConfirm = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      const localDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ); // Create a new Date without time (local time)

      valueChange(localDate); // Store only the local date
    }

    // Format the date as needed
    // const formatted = currentDate.toLocaleDateString();

    // if (formikProps) {
    //   formikProps.setFieldValue(formikKey, formatted); // Ensure field value updates correctly
    // } else {
    //   valueChange(selectedDate);
    // }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Text style={CommonStyles.formLabel}>{title}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.inputContainer}>
        <TextInput
          style={{color: theme.colors.textGray, height: 48}}
          placeholder="Select Date"
          value={
            value
              ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(
                  2,
                  '0',
                )}-${String(value.getDate()).padStart(2, '0')}`
              : ''
          } // Show the selected date
          // value={value ? value.toISOString().split('T')[0] : ''}
          editable={false} // Make the text input non-editable
        />
        <Icon name="calendar-alt" size={25} />

        {show && (
          <DateTimePicker
            value={value}
            mode="date"
            display="default"
            onChange={onConfirm}
          />
        )}
      </TouchableOpacity>
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
});

export default FormikDateInputComponent;
