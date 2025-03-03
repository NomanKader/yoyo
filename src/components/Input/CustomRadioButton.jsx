import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/colors';
import RadioInActive from '../../assets/icons/radioInActive.svg';
import RadioActive from '../../assets/icons/radioActive.svg';

const CustomRadioButton = ({
  item,
  value,
  valueName,
  label,
  onPress,
  selected,
  keyValue = 'radio',
  containerStyle,
  labelStyle = null,
  includeImage,
  imageSource,
}) => {
  return (
    <TouchableOpacity
      style={[styles.radioButtonRow, containerStyle]}
      onPress={() => (item ? onPress(item[valueName], item) : onPress())}
      key={keyValue}>
      {selected ? (
        <RadioActive width={25} height={25} />
      ) : (
        <RadioInActive width={25} height={25} />
      )}
      {includeImage && imageSource && (
        <Image source={{uri: imageSource}} style={styles.itemImage} />
      )}
      <Text style={labelStyle ? labelStyle : styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 12,
  },
  label: {
    color: theme.colors.textDark,
    fontFamily: theme.customfonts.bold,
    fontSize: 16,
    marginLeft: 12,
  },
  radioButton: {
    width: 12,
    height: 12,
  },
  itemImage: {
    borderRadius: 140,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});

export default CustomRadioButton;
