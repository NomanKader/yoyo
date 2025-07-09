import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import hotelIcon from '../assets/hotelIcon.png';
import apartmentIcon from '../assets/apartmentIcon.png';
import {RegisterContext} from '../utils/RegisterProvider';

const screenWidth = Dimensions.get('window').width;

export default function TypeOfPropertyScreen() {
  const {registerData, updateRegisterData, resetRegisterData} =
    useContext(RegisterContext);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handleBack = () => {
    resetRegisterData();
    navigation.goBack();
  };

  const handleProceed = () => {
    if (registerData.type !== undefined) {
      navigation.navigate('Register');
    }
  };

  const handleChange = value => {
    updateRegisterData('type', value);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Type of Property" onPress={handleBack} />

      <Text style={styles.instruction}>
        Firstly, please select one type of property to proceed the registration.
      </Text>

      {/* Property Selection Cards */}
      <TouchableOpacity
        style={[styles.card, registerData.type === 1 && styles.cardSelected]}
        onPress={() => handleChange(1)}>
        <Image source={hotelIcon} style={styles.icon} />
        <Text style={styles.cardText}>Hotel</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity
        style={[styles.card, registerData.type === 2 && styles.cardSelected]}
        onPress={() => handleChange(2)}>
        <Image source={apartmentIcon} style={styles.icon} />
        <Text style={styles.cardText}>Apartment</Text>
      </TouchableOpacity>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[styles.button, !registerData.type && styles.buttonDisabled]}
        disabled={!registerData.type}
        onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: '#fff',
    paddingTop: 3
  },
  instruction: {
    fontSize: 14,
    color: '#333',
    marginVertical: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  cardSelected: {
    backgroundColor: '#e6f0ff',
    borderColor: '#007bff',
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
    fontWeight: '500',
  },
  or: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
