import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DefaultButtonComponent from '../apartment/components/Button/DefaultButtonComponent';
import theme from '../apartment/style/colors';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../App';

export default function ChooseAccountScreen({ navigation }) {
  const { t } = useTranslation();
  const {setIsAuthenticated}=useContext(AuthContext)
  const handleSelect = (role) => {
    if (role === 'hotel') {
      navigation.navigate('HotelTabStack');
    } else {
      navigation.navigate('ApartmentStack');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Account</Text>
      <Text style={styles.subtitle}>Select how you want to manage your properties</Text>

      <TouchableOpacity style={[styles.card, styles.hotelCard]} onPress={() => handleSelect('hotel')}>
        <Image source={require('./assets/hotel.png')} style={styles.icon} />
        <Text style={styles.cardText}>Hotel Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.apartmentCard]} onPress={() => handleSelect('apartment')}>
        <Image source={require('./assets/apartment.png')} style={styles.icon} />
        <Text style={styles.cardText}>Apartment Management</Text>
      </TouchableOpacity>
      <DefaultButtonComponent
        title={t("logout")}
        backgroundColor={theme.colors.textLight}
        textColor={theme.colors.danger}
        buttonStyle={styles.logoutButton}
        onPress={() => {
          setIsAuthenticated(false)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0047AB',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  hotelCard: {
    backgroundColor: '#E3F2FD', // Light blue
  },
  apartmentCard: {
    backgroundColor: '#E8F5E9', // Light green
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    borderColor: "#DC3545",
    borderWidth: 1,
    marginTop: 30,
  }
});
