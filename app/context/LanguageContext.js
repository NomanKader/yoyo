import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  useEffect(() => {
    const fetchLanguageFromStorage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language_preference');
        if (storedLanguage) {
          setLanguage(storedLanguage);
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
    } catch (error) {
      console.error("Error saving language to storage: ", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
