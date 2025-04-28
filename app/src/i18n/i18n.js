import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Import translations
import en from '../locales/en.json';
import mm from '../locales/mm.json';
import th from '../locales/thai.json';

const resources = {
  en: {translation: en},
  mm: {translation: mm},
  th: {translation: th},
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
