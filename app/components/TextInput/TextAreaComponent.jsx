import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function TextAreaComponent({
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  backgroundColor = '#F5F5F5',
  borderRadius = 10,
}) {
  return (
    <View style={[styles.textAreaContainer, { backgroundColor, borderRadius }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={numberOfLines}
        style={styles.textArea}
        textAlignVertical="top" // Align text to the top-left
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textAreaContainer: {
    padding: 10,
  },
  textArea: {
    height: 150, // You can adjust the height based on your preference
    fontSize: 16,
    color: '#333',
  },
});
