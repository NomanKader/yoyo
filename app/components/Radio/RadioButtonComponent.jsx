import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../style/colors';

const RadioButtonComponent = ({ radioButtons, selectedId, onRadioPress }) => {
  return (
    <View>
      {radioButtons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={styles.container}
          onPress={() => onRadioPress(button.id)}
        >
          <Text style={styles.label}>{button.label}</Text>
          <View style={[styles.radio, selectedId === button.id && styles.radioSelected]}>
            {selectedId === button.id && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    color: theme.colors.textDark,
    fontWeight:'500',
    flex: 1,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
});

export default RadioButtonComponent;
