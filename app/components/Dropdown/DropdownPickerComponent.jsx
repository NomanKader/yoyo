import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';

const DropdownPickerComponent = ({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
  placeholder,
  multiple = false,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      multiple={multiple}
      placeholder={placeholder}
      style={styles.input}
      dropDownContainerStyle={styles.dropdown}
      containerStyle={{ zIndex: 5000 }} // Ensure dropdown is above other elements
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ccc',
  },
});

export default DropdownPickerComponent;
