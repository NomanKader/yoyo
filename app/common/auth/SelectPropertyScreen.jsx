import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../apartment/components/Divider/HeaderComponent';
import hotelIcon from '../assets/hotel.png';
import apartmentIcon from '../assets/apartment.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

// const propertyData = {
//   hotels: [
//     {id: 1, name: 'Azure Hotel', type: 'hotel'},
//     {id: 2, name: 'Hotel Vista', type: 'hotel'},
//     {id: 3, name: '121 Hotel', type: 'hotel'},
//   ],
//   apartments: [
//     {id: 4, name: 'Pantanaw Street 3B/42', type: 'apartment'},
//     {id: 5, name: 'Baho Road 142', type: 'apartment'},
//   ],
// };

export default function SelectPropertyScreen() {
  const [propertyData, setPropertyData] = useState({
    hotels: [],
    apartments: [],
  });
  // write backhandler
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('Login'); // 👈 Go to previous screen
        return true; // prevent default back behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, []) // 👈 dependency here (not outside useFocusEffect)
  );
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoJson = await AsyncStorage.getItem('USER_INFO_KEY');
        const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null;

        if (userInfo?.properties && Array.isArray(userInfo.properties)) {
          const hotels = userInfo.properties
            .filter(p => p.isHotel)
            .map(p => ({
              id: p.id,
              name: p.hotelName,
              isHotel: true,
            }));

          const apartments = userInfo.properties
            .filter(p => p.isApartment)
            .map(p => ({
              id: p.id,
              name: p.hotelName,
              isApartment: true,
            }));

          setPropertyData({
            hotels: hotels,
            apartments: apartments,
          });
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const navigation = useNavigation();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleSelect = property => {
    setSelectedProperty(property);
  };

  const handleContinue = () => {
    if (!selectedProperty) return;

    if (selectedProperty.isHotel) {
      navigation.navigate('HotelTabStack');
    } else if (selectedProperty.isApartment) {
      navigation.navigate('ApartmentAppStack');
    }
  };

  const renderPropertyItem = (item, icon) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.propertyItem,
        selectedProperty?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => handleSelect(item)}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.propertyText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Select Property"
        navigation={navigation}
        showBackIcon={false}
      />

      <Text style={styles.instruction}>
        Please select one of your properties to continue!
      </Text>

      {propertyData.hotels.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Hotels</Text>
          <ScrollView
            style={styles.propertyScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            {propertyData.hotels.map(item =>
              renderPropertyItem(item, hotelIcon),
            )}
          </ScrollView>
        </>
      )}

      {propertyData.hotels.length > 0 && propertyData.apartments.length > 0 && (
        <View style={styles.divider} />
      )}

      {propertyData.apartments.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Apartments</Text>
          <ScrollView
            style={styles.propertyScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            {propertyData.apartments.map(item =>
              renderPropertyItem(item, apartmentIcon),
            )}
          </ScrollView>
        </>
      )}

      <TouchableOpacity
        style={[styles.continueButton, !selectedProperty && styles.disabled]}
        disabled={!selectedProperty}
        onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.06,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  propertyScroll: {
    maxHeight: 200, // Adjust height as needed
    marginBottom: 10,
  },

  instruction: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginVertical: 10,
  },
  propertyItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#e6f0ff',
    borderColor: '#007bff',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  propertyText: {
    fontSize: 16,
    color: '#000',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 12,
    width: '80%',
    alignSelf: 'center',
  },
  continueButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
