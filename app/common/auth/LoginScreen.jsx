import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '../../apartment/components/Input/CustomInput';
import CustomAlert from '../alert/CustomAlert';
import {Login} from '../service/AuthService';
import {AuthContext} from '../../../App';

const screenWidth = Dimensions.get('window').width;

export default function LoginScreen() {
  const navigation = useNavigation();
  const {setIsAuthenticated, setUserRole} = useContext(AuthContext);

  const [username, setUsername] = useState('oceanadmain');
  const [pin, setPin] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = username.trim() !== '' && pin.length === 4;

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await Login({username, password: pin});

      if (response.success) {
        await AsyncStorage.setItem('token', response.access_token || '');
        await AsyncStorage.setItem(
          'userRole',
          response.userInfo?.isApartment === true ? 'apartment' : 'hotel',
        );
        await AsyncStorage.setItem(
          "USER_INFO_KEY",
          JSON.stringify(response.userInfo),
        );

        // setIsAuthenticated(true);
        // setUserRole(
        //   response.userInfo?.isApartment === true ? 'apartment' : 'hotel',
        // );
        navigation.reset({
          index: 0,
          routes: [{name: 'SelectProperty'}],
        });
      } else {
        setErrorMessage(response.message || 'Login failed');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title="Login Failed"
        message={errorMessage}
        onClose={() => setAlertVisible(false)}
      />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Login</Text>
      </View>

      <CustomInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        bgColor="#f2f2f2"
        editable={!loading}
      />

      <Text style={styles.label}>Pin</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your 4 digit pin"
          style={styles.inputWithIcon}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={!showPin}
          value={pin}
          onChangeText={setPin}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.iconInsideInput}
          onPress={() => setShowPin(!showPin)}>
          <Icon
            name={showPin ? 'visibility-off' : 'visibility'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPin')}>
        <Text style={styles.forgotText}>Forgot Pin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!isValid || loading}
        onPress={handleLogin}
        style={[
          styles.loginButton,
          (!isValid || loading) && styles.loginButtonDisabled,
        ]}>
        {loading ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.loginText}>Logging in...</Text>
          </View>
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('TypeOfProperty')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  inputWrapper: {
    position: 'relative',
    marginVertical: 8,
  },
  inputWithIcon: {
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingRight: 40,
    fontSize: 16,
    height: 48,
  },
  iconInsideInput: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  forgotText: {
    color: '#007AFF',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#444',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
