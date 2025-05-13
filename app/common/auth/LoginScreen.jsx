import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import LoginImage from '../../apartment/assets/images/loginImage.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import {commonStyle} from '../../apartment/style/commonStyle';
import theme from '../../apartment/style/colors';
import DividerComponent from '../../apartment/components/Divider/DividerComponent';
import _LoginService from '../utils/authService';
import { AuthContext } from '../../../App';

export default function LoginScreen({navigation}) {
  const {t} = useTranslation();
  const [showPin, setShowPin] = useState(false); // ✅ required state
  const [email,setEmail] = useState('hotel@gmail.com'); // ✅ required state
  const [pin, setPin] = useState('123');
  const {setIsAuthenticated,setUserRole}=useContext(AuthContext);
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#FFFFFF'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>          
          <Text style={styles.title}>{t('login')}</Text>
        </View>
        <View style={{marginHorizontal: -20}}>
          <DividerComponent />
        </View>
        <Image source={LoginImage} style={commonStyle.loginImage} />

        <Text style={styles.label}>{t('email')}</Text>
        <TextInput style={styles.input} placeholder={t('enterEmail')} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>{t('pin')}</Text>
        <View style={{position: 'relative'}}>
          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={setPin}
            placeholder={t('enterPin')}
            secureTextEntry={!showPin}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity
            onPress={() => setShowPin(!showPin)}
            style={{
              position: 'absolute',
              right: 10,
              top: 12,
            }}>
            <Icon name={showPin ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.linkRight} onPress={()=>navigation.navigate('ForgetPin')}>
          <Text style={styles.linkBlue}>{t('forgotPin')}</Text>
        </TouchableOpacity>

        <DefaultButtonComponent title={t('login')}   onPress={() =>_LoginService(email,pin,setIsAuthenticated,setUserRole)} />
        

        <TouchableOpacity
          style={styles.centerRow}
          onPress={() => navigation.navigate('Register')}>
          <Text>{t('noAccount')} </Text>
          <Text style={styles.linkBlue}>{t('signUp')}</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>Or sign up with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialCircle}>
            <AntDesign name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <FontAwesome name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <FontAwesome name="apple" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Keep your styles as-is

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textGray,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: theme.colors.backgroundColor,
    fontSize: 14,
    color: theme.colors.textDark,
  },
  linkRight: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  linkBlue: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dividerText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.socialBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
