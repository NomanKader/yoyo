import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TranslateAPI } from '../services/LanguageService';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [translate, setTranslate] = useState(null); // Initialize translate state

  useEffect(() => {
    const fetchLanguageFromStorage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language_preference');
        if (storedLanguage) {
          console.log("Store Language", storedLanguage);
          TranslateAPI(storedLanguage).then(data => setTranslate(data));
          setLanguage(storedLanguage);
        } else {
          TranslateAPI(language).then(data => setTranslate(data));
        }
      } catch (error) {
        console.error("Error fetching language from storage: ", error);
      }
    };

    fetchLanguageFromStorage();
  }, []);

  const updateLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem('language_preference', newLanguage);
      const data = await TranslateAPI(newLanguage);
      setTranslate(data);
    } catch (error) {
      console.error("Error saving language to storage: ", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ translate, setLanguage: updateLanguage, setTranslate }}>
      {children}
    </LanguageContext.Provider>
  );
};
