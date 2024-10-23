import { useState } from 'react';
import {  Text, View, Alert, Dimensions } from 'react-native'
import React from 'react'
import theme from "../style/colors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import DetailAppBarComponent from '../components/AppBar/DetailAppBarComponent';
import DividerComponent from '../components/Divider/DividerComponent';
import DefaultButtonComponent from "../components/Button/DefaultButtonComponent";
import { CommonStyles } from '../style/CommonStyles';

const {width,height} = Dimensions.get('window');

const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    
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
            title='Forgot Pin'
            navigation={navigation} 
          />
          <DividerComponent />

          <View style={CommonStyles.scrollViewContainer}>
            
            <View >
              <Text style={[theme.colors.textDark,{fontWeight:'bold',fontSize:18}]}>Please enter your email address to reset your pincode</Text>
              <View style={{marginBottom: height*0.63}}>
                <TextInputComponent
                  label=''
                  placeholder='Enter email address...'
                  value={email} 
                  onChangeText={setEmail}
                  keyboardType='email-address' 
                  isSecure={false}
                />
              </View>
              
              
              {showLoading && <ActivityIndicator size='large' />}
              
              <View>
                

                

                <DefaultButtonComponent 
                  title='Send email'
                  backgroundColor={theme.colors.primary}
                  onPress={() => {navigation.navigate('OtpVerificationScreen')}}
                  color={theme.colors.textLight}
                  otherStyle={{width:width*0.9,height:height*0.07}}
                  otherTextStyle={{fontSize:14}}
                  disable={ showLoading}
                />

              </View>
              
              

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  
  export default ForgetPassword;