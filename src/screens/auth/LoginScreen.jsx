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
      <CustomTextInput title="Email" value={email} onChangeText={setEmail} />
      <CustomTextInput
        title="Password"
        value={password}
        onChangeText={setPassword}
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
          }}>
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
        l
        iconColor={theme.colors.primary}
        containerStyle={{marginBottom: 10, paddingVertical: 20}}
      />
      <SigninOrRegisterCardComponent
        iconName={'facebook'}
        title={'Continue With Facebook'}
        iconColor={theme.colors.primary}
        containerStyle={{paddingVertical: 20}}
      />
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Text
          style={styles.registerTextPress}
          onPress={() => navigation.navigate('register')}>
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
    margin: 10,
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
