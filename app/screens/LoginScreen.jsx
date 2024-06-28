import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import LoginService from '../services/LoginService';
import { useNavigation } from '@react-navigation/native';
import AccessTokenService from '../helper/AccessTokenService';

const LoginScreen = () => {
  const [username, setUsername] = useState('coffeshop');
  const [password, setPassword] = useState('Password@1');
  const [showLoading,setShowLoading]=useState(false);
  const navigation = useNavigation();
//   check token valid
  useEffect(()=>{
   const checkToken=async()=>{
    const isValid=await AccessTokenService._TokenValidation();
    if(isValid){
        navigation.navigate('home');
    }        
    else{
      navigation.navigate('login');     
    }
}   
checkToken();
  },[])
  const handleLogin = () => {
    setShowLoading(true);
    // Basic validation
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    LoginService({ username, password }, navigation,setShowLoading);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity disabled={showLoading} style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {showLoading &&
      <ActivityIndicator size='large'/>
      }
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
