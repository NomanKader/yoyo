import React, {forwardRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import theme from '../../style/colors';

const OtpInputComponent = forwardRef(({value, onChange, onKeyPress}, ref) => {
  return (
    <TextInput
      ref={ref}
      style={styles.input}
      value={value}
      keyboardType="numeric"
      maxLength={1} // Only allow one character
      onChangeText={onChange} // Handle text change
      onKeyPress={onKeyPress} // Handle key press events
    />
  );
});

const styles = StyleSheet.create({
  //   input: {
  //     height: 50,
  //     width: 40,
  //     borderColor: 'gray',
  //     borderWidth: 1,
  //     textAlign: 'center',
  //     marginHorizontal: 5,
  //     fontSize: 24,
  //   },
  input: {
    width: 40,
    height: 50,
    margin: 5,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    fontSize: 18,
  },
});

export default OtpInputComponent;
