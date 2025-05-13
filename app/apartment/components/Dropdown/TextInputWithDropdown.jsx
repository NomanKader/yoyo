import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TextInputWithDropdown = ({
  label,
  value,
  onChangeText,
  dropdownValue,
  setDropdownValue,
  dropdownData,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Enter size"
          value={value}
          onChangeText={onChangeText}
        />
        <Dropdown
          style={styles.dropdown}
          data={dropdownData}
          labelField="label"
          valueField="value"
          value={dropdownValue}
          onChange={item => setDropdownValue(item.value)}
          placeholder=""
        />
      </View>
    </View>
  );
};

export default TextInputWithDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  dropdown: {
    width: 90,
    borderLeftWidth: 1,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});
