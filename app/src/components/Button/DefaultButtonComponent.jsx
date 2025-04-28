import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import theme from '../../style/colors';

export default function DefaultButtonComponent({
  title,
  titleKey, // 🔵 optional: if you want translation key like 'setting.save'
  onPress,
  backgroundColor = theme.colors.primary,
  textColor = '#FFF',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
}) {
  const { t } = useTranslation(); // 🌎 using i18n translation

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#EAEAEA' : backgroundColor },
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
    backgroundColor: theme.colors.primary,
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
