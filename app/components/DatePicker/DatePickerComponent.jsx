import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/colors';

const DatePickerInputComponent = ({ label, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showMode} style={styles.inputContainer}>
        <Icon name="calendar-today" size={24} color={theme.colors.textInputColor} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor={theme.colors.textInputColor}
          value={date ? date.toLocaleDateString() : ''}
          editable={false} // Prevent typing in the input
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    marginBottom:20
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#01070F',
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 0, // Remove padding to align with icon
  },
});

export default DatePickerInputComponent;
