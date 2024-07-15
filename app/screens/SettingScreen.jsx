import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardComponent from '../components/Card/CardComponent';
import AccessTokenService from '../helper/AccessTokenService';
import { GetLanguageListAPI } from '../services/LanguageService';
import constants from '../config/constants';

const SettingsScreen = ({ navigation }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetLanguageListAPI(setLanguages, setLoading);
    const fetchLanguagePreference = async () => {
      const storedLanguage = await AsyncStorage.getItem('language_preference');
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
        setLanguage(storedLanguage);
      } else {
        setSelectedLanguage('en'); // default to English
        setLanguage('en');
      }
    };
    fetchLanguagePreference();
  }, []);

  const changeLanguage = async (newLanguage) => {
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language_preference', newLanguage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose Language</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.radioContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.radioButton}
              onPress={() => changeLanguage(lang.code)}
            >
              <View style={styles.iconContainer}>
                <Image 
                  source={{ uri: constants.languageIconUrl + lang.image }} 
                  style={styles.icon}
                />
                <View style={selectedLanguage === lang.code ? styles.radioSelected : styles.radio} />
                <Text style={styles.radioText}>{lang.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.bottom}>
        <CardComponent 
          title="Logout" 
          onPress={() => {
            AccessTokenService._ClearKeyChainData();
            navigation.navigate('AuthStack');
          }} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingsScreen;
