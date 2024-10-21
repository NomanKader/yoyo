import React, { useState } from 'react';
import { View, Button,Text, TextInput, Platform, TouchableOpacity,StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';

const DateInputComponent = ({title}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
    // Format the date as needed
    const formatted = currentDate.toLocaleDateString();
    setFormattedDate(formatted);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Text style={CommonStyles.formLabel}>{title}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.inputContainer}>
          <TextInput
            style={{  color:theme.colors.textGray,height:48 }}
            placeholder="Select Date"
            value={formattedDate} // Show the selected date
            editable={false} // Make the text input non-editable
          />
          <Icon name='calendar-alt' size={25} />
          
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
      </TouchableOpacity>
    </View>
  );
};

const styles= StyleSheet.create({
  
  inputContainer:{flexDirection:'row',justifyContent:'space-between',borderColor: theme.colors.borderColor, borderWidth: 1,paddingHorizontal: 10,alignItems:'center',borderRadius:7,backgroundColor:theme.colors.inputBackgroundColor}
});

export default DateInputComponent;
