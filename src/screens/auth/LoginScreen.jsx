import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import CustomTextInput from '../../components/Input/CustomTextInput';
import CustomDividerComponent from '../../components/Divider/CustomDividerComponent';
import SigninOrRegisterCardComponent from '../../components/Card/SginOrRegisterCardComponent';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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
        value={email}
        onChangeText={setEmail}
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
        onPress={() => navigation.navigate('confirmEmail')}
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
