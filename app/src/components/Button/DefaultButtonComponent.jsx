import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import theme from '../../style/colors';

export default function DefaultButtonComponent({
  title,
  titleKey, 
  onPress,
  backgroundColor = theme.colors.primary,
  textColor = '#FFF',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  borderColor,          
  borderWidth = 0,      
}) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#EAEAEA' : backgroundColor,
          borderColor: borderColor || 'transparent',
          borderWidth: borderWidth,
        },
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { color: disabled ? '#999' : textColor },
            textStyle,
          ]}
        >
          {titleKey ? t(titleKey) : title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
