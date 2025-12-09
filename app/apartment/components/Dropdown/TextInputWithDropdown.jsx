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
  placeholder = 'Enter Size',   // ✅ fixed
  position = 'end',
  bgColor = '#fff',
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {position === 'front' && (
          <Dropdown
            disabled={!editable}
            style={[styles.dropdown, { backgroundColor: bgColor }]}
            data={dropdownData}
            labelField="label"
            valueField="value"
            value={dropdownValue}
            onChange={item => setDropdownValue(item.value)}
            placeholder=""
          />
        )}

        <TextInput
          editable={editable}
          style={[styles.textInput, { backgroundColor: bgColor }]}
          keyboardType="numeric"
          placeholder={placeholder}    // ✅ fixed
          value={value}
          onChangeText={onChangeText}
        />

        {position === 'end' && (
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderLeftWidth: 1,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: bgColor,
              },
            ]}
            data={dropdownData}
            labelField="label"
            valueField="value"
            onChange={item => setDropdownValue(item.value)}
            value={dropdownValue}
            placeholder=""
          />
        )}
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
    height: 50,
  },
  textInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  dropdown: {
    width: 90,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});
