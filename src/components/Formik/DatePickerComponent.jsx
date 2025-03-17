import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const formatDate = (date) => {
  return date ? date.toISOString().split('T')[0] : 'Choose Date';
};

const DatePickerComponent = ({ birthDate, setBirthDate, contentContainerStyle }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={contentContainerStyle}>
      <Text style={styles.label}>Birth Date</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{formatDate(birthDate)}</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
        <Icon name="calendar-today" size={20} color="#555" style={styles.calendarIcon}/>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={open}
        date={birthDate || new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setBirthDate(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures text and icon are spaced properly
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  calendarIcon: {
    marginRight: 10, // Adjust spacing between text and icon
  },
});

export default DatePickerComponent;
