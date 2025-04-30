import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import BackIcon from '../../assets/icons/backIcon.png';

export default function OTPScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={BackIcon} style={styles.backIcon} />
      <Text style={styles.title}>{t('otpVerification')}</Text>

      <TextInput style={styles.input} placeholder={t('enterOTP')} keyboardType="number-pad" />

      <DefaultButtonComponent title={t('verifyOTP')} />

      <TouchableOpacity style={styles.centerRow}>
        <Text>{t('noOTP')} </Text>
        <Text style={styles.link}>{t('resendOTP')}</Text>
      </TouchableOpacity>
    </View>
  );
}
