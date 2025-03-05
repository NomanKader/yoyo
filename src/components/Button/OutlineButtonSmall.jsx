import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../styles/colors';
import {CommonStyles} from '../../styles/CommonStyles';

function OutlineButtonSmall({
  label,
  onPress,
  iconLeftMaterial,
  iconLeftFeather,
  buttonStyle,
  textStyle,
  iconStyle,
  disabled = false,
  isLoad = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.outlineButtonSmall, buttonStyle]}
      onPress={onPress}
      disabled={disabled || isLoad}>
      {iconLeftMaterial && (
        <MaterialCommunityIcons
          name={iconLeftMaterial}
          size={20}
          color={theme.colors.textDark}
          style={[styles.iconLeft, iconStyle]}
        />
      )}
      {iconLeftFeather && (
        <Feather
          name={iconLeftFeather}
          size={20}
          color={theme.colors.textDark}
          style={[styles.iconLeft, iconStyle]}
        />
      )}
      <Text style={[styles.label, textStyle]}>{label}</Text>
      {isLoad && (
        <ActivityIndicator size={'small'} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outlineButtonSmall: {
    borderColor: theme.colors.outlineBtnBorder,
    borderWidth: 0.7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 170,
  },
  label: {
    color: theme.colors.textDark,
    fontSize: 15,
    fontFamily: theme.customfonts.bold,
    marginHorizontal: 7,
  },
});

export default OutlineButtonSmall;
