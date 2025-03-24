// src/i18n/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18nextReactNativeAsyncStorage from 'i18next-react-native-async-storage';

import en from '../languages/en.json';
import mm from "../languages/mm.json"
const getSavedLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('userLanguage');
  return savedLanguage || 'en';
};

(async () => {
  const savedLanguage = await getSavedLanguage();

  i18n
    .use(initReactI18next)
    .use(i18nextReactNativeAsyncStorage(AsyncStorage))
    .init({
      fallbackLng: 'th',
      lng: savedLanguage, // Load saved language on init
      debug: true,
      resources: {
        en,
        mm,
      },
      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: {escapeValue: false},
    })
    .then(() => console.log('i18n initialized'))
    .catch(err => console.error('i18n init error:', err));
})();

export default i18n;
