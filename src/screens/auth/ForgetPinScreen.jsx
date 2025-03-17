import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import theme from '../../styles/colors';
import DetailAppBarComponent from '../../components/AppBar/DetailAppBarComponent';
import TextInputComponent from '../../components/Input/TextInputComponent';
import DefaultButtonComponent from '../../components/Button/DefaultButtonComponent';

const ForgetPinScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <DetailAppBarComponent navigation={navigation} title={'Forgot Pin'} />
      <View style={{padding: 20}}>
        <Text style={styles.text}>
          Please enter your email address to reset your pincode
        </Text>
        <TextInputComponent
          placeholder={'Enter email address'}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.buttonStyle}>
        <DefaultButtonComponent title={'Send Email'} />
      </View>
    </View>
  );
};

export default ForgetPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.textLight,
  },
  text: {
    fontSize: 16,
  },
  buttonStyle: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
});
