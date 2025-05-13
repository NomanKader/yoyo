import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import BackIcon from '../../apartment/assets/icons/backIcon.png';
import RegisterImage from '../../apartment/assets/images/loginImage.png';
import DividerComponent from '../../apartment/components/Divider/DividerComponent';

export default function RegisterScreen({navigation}) {
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          {/* Header with back icon and title */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backIconWrapper} onPress={() => navigation.goBack()}>
              <Image source={BackIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>{t('register')}</Text>
          </View>
          <View style={{marginHorizontal: -20}}>
            <DividerComponent />
          </View>

          {/* Illustration */}
          <Image source={RegisterImage} style={styles.image} />

          {/* Form Fields */}
          <Text style={styles.label}>{t('username')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterUsername')}
            keyboardType="default"
            returnKeyType="next"
          />

          <Text style={styles.label}>{t('email')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterEmail')}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>{t('phone')}</Text>
          <TextInput
            style={styles.input}
            placeholder="+95 09..."
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>{t('createPin')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterPin')}
            secureTextEntry
            keyboardType="number-pad"
          />

          <Text style={styles.label}>{t('referralCode')}</Text>
          <TextInput style={styles.input} placeholder={t('enterReferral')} />

          {/* Already have account */}
          <View style={styles.bottomText}>
            <Text>{t('alreadyAccount')} </Text>
            <Text style={styles.link}>{t('signIn')}</Text>
          </View>

          {/* Register Button */}
          <View style={{marginBottom: 20}}>
            <DefaultButtonComponent title={t('register')} onPress={() => navigation.navigate("OTP")} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    paddingTop:20
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIconWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  image: {
    height: 140,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    fontSize: 14,
    color: '#000',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  link: {
    color: '#0047AB',
    fontWeight: 'bold',
  },
});
