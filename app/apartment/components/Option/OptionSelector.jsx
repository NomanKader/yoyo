import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionSelector = ({
  label,
  options,
  selected,
  setSelected,
  multiSelect = false, // 🔹 optional prop
}) => {
  const handlePress = (option) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        setSelected(selected.filter(item => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    } else {
      setSelected(option);
    }
  };

  const isSelected = (option) =>
    multiSelect ? selected.includes(option) : selected === option;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.group}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.button,
              isSelected(option) && styles.buttonSelected,
            ]}
            onPress={() => handlePress(option)}
          >
            <Text style={isSelected(option) ? styles.textSelected : styles.text}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OptionSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 8,
  },
  buttonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  text: {
    color: '#000',
  },
  textSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
