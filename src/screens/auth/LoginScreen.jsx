import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import CustomTextInput from '../../components/Input/CustomTextInput';
import CustomDividerComponent from '../../components/Divider/CustomDividerComponent';
import SigninOrRegisterCardComponent from '../../components/Card/SginOrRegisterCardComponent';
import {LoginAPI} from '../../api/Auth/AuthController';
import CustomModalAlert from '../../components/Modal/CustomModalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('891011');
  const [password, setPassword] = useState('123');
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState();
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    const postBody = {
      Phone: phoneNumber,
      Password: password,
    };    
    try {
      const res = await LoginAPI(postBody);
      console.log('Res', res);
      setMessage(res.message);
      setStatus(res.status);
      setVisible(true);
      if (res.status && res.data?.id) {
        await AsyncStorage.setItem('userId', res.data.id.toString());
      }
      // navigation.replace('TabStack')
    } catch (error) {
      console.error('Login Error', error);
      setMessage('An error occurred'); // Default error message
      setStatus(false);
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome Back</Text>
        <Text style={styles.subTitleText}>
          Welcome Back. please Enter your details
        </Text>
      </View>
      <CustomTextInput
        type={'phone-pad'}
        title="Mobile Phone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <CustomTextInput
        title="Password"
        value={password}
        onChangeText={setPassword}
        type={'password'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <CustomCheckBox
          isChecked={isChecked}
          isSwap={true}
          onToggle={() => setIsChecked(!isChecked)}
          label={'Remember me'}
          infoContainerStyle={{marginRight: 10}}
        />
        <Text
          style={{
            color: theme.colors.textGray,
            textAlign: 'right',
            borderBottomColor: theme.colors.textGray,
            borderBottomWidth: 1,
          }}
          onPress={() => navigation.navigate('confirmEmail')}>
          Forgot Password?
        </Text>
      </View>
      <DefaultButtonComponent
        title="Login"
        onPress={() => handleLogin()}
        buttonStyle={{marginVertical: 30}}
      />
      <CustomDividerComponent
        containerStyle={{marginBottom: 30, marginHorizontal: 16}}
      />
      <SigninOrRegisterCardComponent
        iconName={'google'}
        title={'Continue With Google'}
        iconColor={theme.colors.googleIconColor}
        containerStyle={{marginBottom: 10}}
      />
      <SigninOrRegisterCardComponent
        iconName={'facebook'}
        title={'Continue With Facebook'}
        iconColor={theme.colors.facebookIconColor}
        containerStyle={{marginBottom: 10}}
      />
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Text
          style={styles.registerTextPress}
          onPress={() => navigation.replace('register')}>
          Register
        </Text>
      </View>
      <CustomModalAlert
        visible={visible}
        type={status?'success':'warning'}
        status={status}
        title={'Login Status'}
        message={message}
        onClose={()=>[setVisible,navigation.replace('TabStack')]}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.textLight,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    color: theme.colors.textBlack,
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: 14,
    color: theme.colors.textGray,
  },
  registerText: {
    textAlign: 'center',
    color: theme.colors.textGray,
  },
  registerTextPress: {
    color: theme.colors.primary,
    paddingLeft: 8,
    textAlign: 'center',
  },
});
