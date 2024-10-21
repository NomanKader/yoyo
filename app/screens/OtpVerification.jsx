import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import theme from "../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from "../components/Button/DefaultButtonComponent";
import { CommonStyles } from '../style/CommonStyles';

const OtpVerification = ({navigation}) => {
    const [otp, setOtp] = useState('');
    
    const [showLoading, setShowLoading] = useState(false);
    
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
  
    
  
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView style={CommonStyles.container} >
          <DetailAppBarComponent 
            title='OTP Verification'
            navigation={navigation} 
          />
          <DividerComponent />
          <View style={CommonStyles.scrollViewContainer}>
            
            <View style={{width:'100%'}}>

              <View style={{marginBottom: '125%'}}>
                <TextInputComponent
                  label='OTP Code'
                  placeholder='Enter 6 digit otp code...'
                  value={otp} 
                  onChangeText={setOtp}
                  keyboardType='' 
                  isSecure={false}
                />
              </View>
              
              
              {showLoading && <ActivityIndicator size='large' />}
              
              <View>
                <Text style={[styles.createAccountText,{marginBottom:20,}]}>
                  No OTP yet?  
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('LoginScreen')}
                  >
                    <Text style={[styles.signUpText,{marginLeft:5}]}>Resend OTP</Text>
                  </TouchableOpacity>
                </Text>

                

                <DefaultButtonComponent 
                  title='Verify OTP'
                  backgroundColor={theme.colors.primary}
                  onPress={() => {navigation.replace('TabStack')}}
                  color={theme.colors.textLight}
                  otherStyle={{width:370,height:60}}
                  otherTextStyle={{fontSize:22}}
                  disable={ showLoading}
                />

              </View>
              
              

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
  
  
  export default OtpVerification;