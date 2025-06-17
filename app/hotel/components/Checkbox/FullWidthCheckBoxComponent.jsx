import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/colors';
export default function FullWidthCheckboxComponent({value, onChange}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!value)}
      activeOpacity={0.7}>
      <Text style={styles.label}>Breakfast included</Text>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: value ? theme.colors.primary : 'transparent',
          },
        ]}>
        {value && <Icon name="check" size={18} color="white" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
});
