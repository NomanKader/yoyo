import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import theme from "../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import PhoneInputComponent from '../components/TextInput/PhoneInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from "../components/Button/DefaultButtonComponent";
import { CommonStyles } from '../style/CommonStyles';

const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [refferCode, setRefferCode] = useState();
    const [showLoading, setShowLoading] = useState(false);
    
  
    // Check token valid
    useEffect(() => {
      const checkToken = async () => {
        const isValid = await AccessTokenService._TokenValidation();
        if (isValid) {
          navigation.navigate('TabStack');
        } else {
          navigation.navigate('Login');
        }
      }
      // checkToken();
    }, []);
  
    const handleLogin = () => {
      setShowLoading(true);
      // Basic validation
      if (username === '' || password === '') {
        Alert.alert('Error', 'Please enter both username and password.');
        setShowLoading(false);
        return;
      }
      LoginService({ username, password }, navigation, setShowLoading);
    };
  
    const isButtonDisabled = username === '' || password === '';
  
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView style={CommonStyles.container} >
          <DetailAppBarComponent 
            title='Register'
            navigation={navigation} 
          />
          <DividerComponent />

          <View style={CommonStyles.scrollViewContainer}>
            <Image source={require('../assets/images/login.png')} resizeMode="cover" style={{width:'100%',height:223}} alt="Login image" />
            <View style={{width:'100%'}}>

              <TextInputComponent
                label='Username'
                placeholder='Username...'
                value={username} 
                onChangeText={setUsername}
                keyboardType='' 
                isSecure={false}
              />

              <TextInputComponent
                label='Email'
                placeholder='Email...'
                value={email} 
                onChangeText={setEmail}
                keyboardType='email-address' 
                isSecure={false}
              />
              <PhoneInputComponent
                label='Phone'
                value={phone}
                onChange={setPhone}
              />

              <TextInputComponent
                label='Create Pin'
                placeholder='Enter 4 digit pin...'
                value={password} 
                onChangeText={setPassword}
                keyboardType='' 
                isSecure={false}
              />

              <TextInputComponent
                label='Refferal code'
                placeholder='Refferal code...'
                value={refferCode} 
                onChangeText={setRefferCode}
                keyboardType='numeric' 
                isSecure={false}
              />

                <Text style={[styles.createAccountText,{marginBottom:10,alignSelf:'flex-end'}]}>
                  Already have an account?
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('LoginScreen')}
                  >
                    <Text style={styles.signUpText}>Sign In</Text>
                  </TouchableOpacity>
                </Text>
              
              

              <DefaultButtonComponent 
                title='Register'
                backgroundColor={theme.colors.primary}
                onPress={() => {navigation.navigate('OtpVerificationScreen')}}
                color={theme.colors.textLight}
                otherStyle={{width:370,height:60,marginBottom:20}}
                otherTextStyle={{fontSize:22}}
                disable={isButtonDisabled || showLoading}
              />

              {showLoading && <ActivityIndicator size='large' />}
              
              
              
              

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    createAccountText: {
      color: theme.colors.infoText,
      textAlign: 'center',
      marginTop: 10,
    },
    signUpText: {
      color:theme.colors.primary,
      textDecorationLine: 'underline',
      textAlign: 'center',
      marginTop: 5,
      fontWeight:'bold'
    },
  })
  
  
  export default Register;