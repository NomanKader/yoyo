import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardComponent from '../components/Card/CardComponent';
import AccessTokenService from '../helper/AccessTokenService';

const SettingsScreen = ({ navigation }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language_preference');
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
        setLanguage(storedLanguage);
      } else {
        setSelectedLanguage('english'); // default to English
        setLanguage('english');
      }
    };

    fetchLanguage();
  }, []);

  const changeLanguage = async (newLanguage) => {
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language_preference', newLanguage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Language</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          style={styles.radioButton} 
          onPress={() => changeLanguage('english')}
        >
          <View style={selectedLanguage === 'english' ? styles.radioSelected : styles.radio} />
          <Text style={styles.radioText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.radioButton} 
          onPress={() => changeLanguage('myanmar')}
        >
          <View style={selectedLanguage === 'myanmar' ? styles.radioSelected : styles.radio} />
          <Text style={styles.radioText}>Myanmar</Text>
        </TouchableOpacity>
      </View>
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
}

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
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
  bottom: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingsScreen;
