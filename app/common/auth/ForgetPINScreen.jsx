import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import {useTranslation} from 'react-i18next';
import CustomInput from '../../apartment/components/Input/CustomInput';
import DefaultButtonComponent from '../../apartment/components/Button/DefaultButtonComponent';
import {ForgetPassword} from '../service/AuthService';

const ForgetPINScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {t} = useTranslation();
  const isValid = email.length > 0 && email.includes('@');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const postBody = {
        email: email,
        phone: '',
      };

      const response = await ForgetPassword(postBody);

      if (response?.result) {
        navigation.navigate('ResetOTPConfirm', {
          email: email,
        });
      } else {
        console.warn(
          'Failed to send reset email:',
          response?.message || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('ResetOTPConfirm', {
    //   email: email,
    // });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={t('forgotPin')}
        onPress={() => navigation.goBack()}
      />
      <CustomInput
        label={
          'Please enter your email address to reset you pin code and will send confirmation code to your email'
        }
        bgColor="#f2f2f2"
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        contentContainerStyle={{marginTop: 20}}
        mv={20}
        keyboardType='email-address'
      />
      <View style={styles.bottomSection}>
        <TouchableOpacity
          disabled={!isValid || loading}
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          onPress={handleSendEmail}>
          <Text style={styles.buttonText}>
            {loading ? 'Proceeding...' : 'Send Email'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPINScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  bottomSection: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
