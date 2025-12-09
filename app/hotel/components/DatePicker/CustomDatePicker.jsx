import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../style/colors';

const CustomDatePicker = ({ value, onChange, placeholder = 'Select date' }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(value || null);

  // Sync internal date state when parent value changes
  useEffect(() => {
    setDate(value || null);
  }, [value]);

  const handleChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);         
      onChange && onChange(selectedDate); 
    }
  };

  const formattedDate = date ? date.toLocaleDateString() : '';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={formattedDate}
        placeholderTextColor={theme.colors.textInputColor}
        editable={false}
        pointerEvents="none"
      />
      <TouchableOpacity onPress={() => setShow(true)} style={styles.iconContainer}>
        <Icon name="calendar" size={24} color="#555" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.status.backgroundColor,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 10,
    backgroundColor: theme.status.backgroundColor,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  iconContainer: {
    padding: 6,
  },
});

export default CustomDatePicker;
