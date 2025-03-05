import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import CustomTextInput from '../../components/Input/CustomTextInput';
import CustomDividerComponent from '../../components/Divider/CustomDividerComponent';
import SigninOrRegisterCardComponent from '../../components/Card/SginOrRegisterCardComponent';

const RegisterScreen = ({navigation}) => {
  const [mobilePhone, setMobilePhone] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Start Your Journey with Us</Text>
        <Text style={styles.subTitleText}>
          Please provide additional information for registration
        </Text>
      </View>
      <CustomTextInput
        type={'phone-pad'}
        title="Mobile Phone"
        value={mobilePhone}
        onChangeText={setMobilePhone}
      />
      <CustomTextInput
        title="Password"
        value={password}
        onChangeText={setPassword}
        type={'password'}
      />
      <CustomTextInput
        title="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        type={'password'}
      />
      <CustomCheckBox
        isChecked={isChecked}
        isSwap={true}
        onToggle={() => setIsChecked(!isChecked)}
        label={'I agree to Terms and Conditions'}
        infoContainerStyle={{paddingLeft: 16}}
      />

      <DefaultButtonComponent
        title="Login"
        onPress={() => Alert.alert('Register')}
        buttonStyle={{marginVertical: 20}}
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
        <Text style={styles.registerText}>Have an account?</Text>
        <Text
          style={styles.registerTextPress}
          onPress={() => navigation.replace('login')}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.textLight,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
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
