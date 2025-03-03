import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import theme from '../../styles/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import CustomTextInput from '../../components/Input/CustomTextInput';
import CustomDividerComponent from '../../components/Divider/CustomDividerComponent';
import SigninOrRegisterCardComponent from '../../components/Card/SginOrRegisterCardComponent';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState();
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
      <CustomTextInput title="Email" value={email} onChangeText={setEmail} />
      <CustomTextInput
        title="Password"
        value={password}
        onChangeText={setPassword}
      />
      <CustomTextInput
        title="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
        l
        iconColor={theme.colors.primary}
        containerStyle={{marginBottom: 10, paddingVertical: 20}}
        onPress={() => Alert.alert('Google')}
      />
      <SigninOrRegisterCardComponent
        iconName={'facebook'}
        title={'Continue With Facebook'}
        iconColor={theme.colors.primary}
        containerStyle={{paddingVertical: 20}}
        onPress={() => Alert.alert('Facebook')}
      />
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <Text style={styles.registerText}>Have an account?</Text>
        <Text
          style={styles.registerTextPress}
          onPress={() => navigation.navigate('register')}>
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
    margin: 10,
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
