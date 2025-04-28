import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function NotiTabScreen() {
  const { t } = useTranslation(); // Hook to translate

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{t('welcome')}</Text>
      <Text style={styles.descriptionText}>{t('homeDescription')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
