import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginService from '../services/LoginService';
import { useNavigation } from '@react-navigation/native';
import AccessTokenService from '../helper/AccessTokenService';
import Logo from '../assets/icons/yoyologo.png';
import theme from '../style/colors';

const LoginScreen = () => {
  const [username, setUsername] = useState('coffeshop');
  const [password, setPassword] = useState('Password@1');
  const [showLoading, setShowLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

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
    checkToken();
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
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Login Name"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={isButtonDisabled || showLoading}
          style={[styles.button, (isButtonDisabled || showLoading) && styles.buttonDisabled]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {showLoading && <ActivityIndicator size='large' />}
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Forget Password</Text>
        </TouchableOpacity>
        <Text style={styles.createAccountText}>
          If you don't have a partner account, Please create now!
        </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    marginBottom: 24,
  },
  card: {
    marginTop: -40,
    width: '100%',
    padding: 30,
    borderRadius: 8,
    backgroundColor: theme.colors.textLight,
    shadowColor: theme.colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.inputBackgroundColor,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50, // Increase the height of the TextInput
    color: theme.colors.textDark,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15, // Increase the vertical padding
    paddingHorizontal: 25, // Increase the horizontal padding
    borderRadius: 30, // Increase the border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.borderColor,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: 18, // Increase the font size
  },
  forgetPasswordText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
    fontWeight:'bold'
  },
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
});

export default LoginScreen;
