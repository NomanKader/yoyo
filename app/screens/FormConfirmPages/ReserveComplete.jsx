import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install and link FontAwesome
import buildingImg from '../../assets/images/buildings.png'
import theme from '../../style/colors';
import { CommonStyles } from '../../style/CommonStyles';

const ReservationComplete = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
      <ImageBackground 
        source={buildingImg} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.checkmarkContainer}>
            <Icon name="check-circle" size={50} color="#fff" />
          </View>
          <Text style={styles.title}>Reservation Successful</Text>
          <Text style={styles.subtitle}>
            Reservation for <Text style={styles.boldText}>Room 406</Text> is successful and the {' '}
            ID is <Text style={styles.boldText}>CAL7396748</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppStack', { screen: 'CheckInDetailScreen' })}>
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:theme.colors.primary
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  checkmarkContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 100, // Circle
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 22,
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.colors.textLight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    color: theme.colors.primary, // Primary color for text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationComplete;
