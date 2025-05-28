import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {LanguageContext} from '../../context/LanguageContext';
import {useTranslation} from 'react-i18next';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import theme from '../../style/colors';
import {AuthContext} from '../../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingTabScreen({navigation}) {
  const {language, changeLanguage} = useContext(LanguageContext);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {t} = useTranslation();
  const {setIsAuthenticated, setUserRole} = useContext(AuthContext);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here you can extend logic to actually change app-wide theme
  };
  const handleLogoutPress = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'userRole']);
      setIsAuthenticated(false);
      setUserRole(null);
  
      // 🧼 Reset navigation stack to AuthStack
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
        <View style={{width: 24}} />
      </View>

      {/* General Settings */}
      <Text style={styles.sectionTitle}>{t('general')}</Text>
      <View style={styles.settingCard}>
        {/* Language */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setLanguageModalVisible(true)}>
          <Text style={styles.settingLabel}>{t('language')}</Text>
          <View style={styles.languageRow}>
            <Text style={styles.settingValue}>{language}</Text>
            <Icon name="chevron-right" size={18} color="#A0A0A0" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Application Settings */}
      <Text style={styles.sectionTitle}>{t('applicationSettings')}</Text>
      <View style={styles.settingCard}>
        {/* Theme Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t('theme')}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isDarkMode ? '#0047AB' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Logout Button */}
      <DefaultButtonComponent
        title={t('logout')}
        backgroundColor={theme.colors.textLight}
        textColor={theme.colors.danger}
        buttonStyle={styles.logoutButton}
        onPress={handleLogoutPress}
      />

      {/* Language Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('chooseLanguage')}</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                changeLanguage('en');
                setLanguageModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                changeLanguage('mm');
                setLanguageModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>Myanmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                changeLanguage('th');
                setLanguageModalVisible(false);
              }}>
              <Text style={styles.modalOptionText}>Thai</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.modalCancelText}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  settingCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  settingValue: {
    fontSize: 14,
    color: '#777',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoutButton: {
    borderColor: '#DC3545',
    borderWidth: 1,
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
  },
});
