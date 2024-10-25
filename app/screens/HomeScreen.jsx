// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardComponent from '../components/Card/CardComponent';
import AccessTokenService from '../helper/AccessTokenService';
import _BackHandlerService from '../helper/BackButtonHandlerService';

const HomeScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
       const isValid=await AccessTokenService._TokenValidation();
       console.log("isValud",isValid);
       if(isValid){
        setIsAuthenticated(true)
       }
       else{
        Alert.alert("","Session Expired");
        navigation.navigate('unauthorized');
       }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
        navigation.navigate('Login');
      }
    };

    checkAccessToken();
    _BackHandlerService();
  }, [navigation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <CardComponent title="Product" onPress={() => Alert.alert('Product')} />
      <CardComponent title="Hotel" onPress={() => Alert.alert('Hotel')} />
      <CardComponent title="SPA" onPress={() => Alert.alert('SPA')} />
      <CardComponent title="KTV" onPress={() => Alert.alert('KTV')} />
      <CardComponent title="Logout" onPress={()=>[AccessTokenService._ClearKeyChainData(),navigation.navigate('Login')]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});

export default HomeScreen;
