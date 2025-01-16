import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {CommonStyles} from '../../style/CommonStyles';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../../components/Divider/DividerComponent';
import TextInputComponent from '../../components/TextInput/TextInputComponent';
import PhoneInputComponent from '../../components/TextInput/PhoneInputComponent';
import theme from '../../style/colors';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';

const {width, height} = Dimensions.get('window');

const AccountSetting = ({navigation}) => {
  const [name, setName] = useState('Tun Tun');
  const [email, setEmail] = useState('tuntun@gmail.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const isButtonDisabled = name === '' || email === '';

  return (
    <ScrollView style={CommonStyles.container}>
      <DetailAppBarComponent title="Account Settings" navigation={navigation} />
      <DividerComponent />

      <View style={CommonStyles.scrollViewContainer}>
        <TextInputComponent
          label="Full Name"
          placeholder="Tun Tun"
          value={name}
          onChangeText={setName}
          keyboardType=""
          isSecure={false}
        />
        <TextInputComponent
          label="Email Address"
          placeholder="Email address..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          isSecure={false}
        />
        <PhoneInputComponent label="Phone" value={phone} onChange={setPhone} />
        <View style={styles.passwordContainer}>
          <View style={styles.passwordInput}>
            <TextInputComponent
              label="Passwords"
              placeholder="000 000 000 000"
              value={password}
              onChangeText={setPassword}
              keyboardType=""
              isSecure={false}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AppStack', {screen: 'UpdatePasswordScreen'});
            }}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <DefaultButtonComponent
          title="Proceed"
          backgroundColor={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.colors.textLight}
          otherStyle={styles.proceedButton}
          otherTextStyle={{fontSize: 16}}
          disable={isButtonDisabled || showLoading}
        />
      </View>
    </ScrollView>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
  },
  passwordInput: {
    width: width * 0.8,
  },
  editText: {
    width: width * 0.1,
    marginTop: height * 0.06,
    color: theme.colors.textDark,
    fontWeight: 'bolder',
    padding: 5,
    borderRadius: 5,
  },
  proceedButton: {
    width: width * 0.9,
    height: height * 0.07,
    alignSelf: 'center',
    marginTop: height * 0.3,
  },
});
