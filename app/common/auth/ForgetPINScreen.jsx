import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import BackIcon from '../../apartment/assets/icons/backIcon.png';
import DividerComponent from '../../apartment/components/Divider/DividerComponent';
import theme from '../../apartment/style/colors';

export default function ForgetPINScreen({navigation}) {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backIconWrapper}
              onPress={() => navigation.goBack()}>
              <Image source={BackIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>{t('forgotPin')}</Text>
          </View>

          {/* Divider */}
          <View style={{marginHorizontal: -20}}>
            <DividerComponent />
          </View>

          {/* Description */}
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.description}>{t('enterEmailToReset')}</Text>

            {/* Input */}
            <TextInput
              style={styles.input}
              placeholder={t('enterEmail')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </ScrollView>

        {/* Fixed Button at Bottom */}
        <View style={styles.footer}>
          <DefaultButtonComponent onPress={()=>Alert.alert('We have sent mail to '+email+' .Please check')} title={t('sendEmail')} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  backIconWrapper: {
    position: 'absolute',
    left: 0,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textGray,
    paddingVertical: 10,    
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.backgroundColor,
    fontSize: 14,
    color: theme.colors.textDark,
    marginTop:10    
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.textLight,
  },
});
