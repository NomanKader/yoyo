import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import _BackHandlerService from '../helper/BackButtonHandlerService';

const UnauthorizedScreen = ({navigation}) => {
  //disable back button
  useEffect(()=>{
    _BackHandlerService();
  },[])
   
  const handleLoginNavigation = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unauthorized Access</Text>
      <Text style={styles.message}>
        You do not have access to this content. Please log in to continue.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginNavigation}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
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

export default UnauthorizedScreen;
