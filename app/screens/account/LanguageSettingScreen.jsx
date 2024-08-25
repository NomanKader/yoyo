import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { LanguageContext } from '../../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardComponent from '../../components/Card/CardComponent';
import AccessTokenService from '../../helper/AccessTokenService';
import { GetLanguageListAPI } from '../../services/LanguageService';
import constants from '../../config/constants';
import { CommonStyles } from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import theme from '../../style/colors';

const LanguageSettingsScreen = ({ navigation }) => {
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
        setSelectedLanguage('eng'); // default to English
        setLanguage('eng');
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
    <>
      <View style={CommonStyles.scrollViewContainer}>
        <DetailAppBarComponent title={"Language"} navigation={navigation} />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <View style={styles.radioContainer}>
              {languages.map((lang) => (
                <React.Fragment key={lang.id}>
                  {/* Make the container Touchable */}
                  <TouchableOpacity 
                    style={styles.radioButtonContainer} 
                    onPress={() => changeLanguage(lang.code)}
                  >
                    <View style={[styles.radio, selectedLanguage === lang.code && styles.radioSelected]}>
                      {selectedLanguage === lang.code && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.label}>{lang.name}</Text>
                    <Image 
                      source={{ uri: constants.languageIconUrl + lang.image }} 
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <DividerComponent />
                </React.Fragment>
              ))}
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  radioContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    padding:10
  },
  label: {
    fontSize: 16,
    color: theme.colors.textDark,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  icon: {
    width: 30,
    height: 30,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default LanguageSettingsScreen;
